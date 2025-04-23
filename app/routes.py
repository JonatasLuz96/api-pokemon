from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import SessionLocal
from . import models, database, schemas
import httpx
import asyncio

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/favorites/', response_model=schemas.FavoritePokemon)
def create_favorite(fav: schemas.FavoritePokemonCreate, db: Session = Depends(get_db)):
    new_fav = models.FavoritePokemon(**fav.dict())
    db.add(new_fav)
    db.commit()
    db.refresh(new_fav)
    return new_fav

@router.get('/favorites/')
def get_favorites(db: Session = Depends(database.get_db)):
    pokemons = db.query(models.FavoritePokemon).all()
    return pokemons

@router.get("/pokemons/")
async def get_pokemons(limit: int = 100, offset: int = 0):
    url = f"https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()

        async def fetch_details(pokemon):
            details_response = await client.get(pokemon["url"])
            details = details_response.json()
            return {
                "name": pokemon["name"],
                "image": details["sprites"]["front_default"]
            }

        tasks = [fetch_details(pokemon) for pokemon in data["results"]]
        pokemon_list = await asyncio.gather(*tasks)

    return pokemon_list

@router.delete("/favorites/{favorite_id}")
def delete_favorite(favorite_id: int, db: Session = Depends(get_db)):
    favorite = db.query(models.FavoritePokemon).filter(models.FavoritePokemon.id == favorite_id).first()
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorito não encontrado")
    db.delete(favorite)
    db.commit()
    return {"message": "Favorito removido com sucesso"}
