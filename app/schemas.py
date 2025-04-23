from pydantic import BaseModel
from datetime import datetime

class FavoritePokemonBase(BaseModel):
    pokemon_name: str
    pokemon_id: int

class FavoritePokemonCreate(FavoritePokemonBase):
    pass

class FavoritePokemon(FavoritePokemonBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True