from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class FavoritePokemon(Base):
    __tablename__ = 'favorite_pokemons'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    pokemon_name = Column(String(100), nullable=False)
    pokemon_id = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    