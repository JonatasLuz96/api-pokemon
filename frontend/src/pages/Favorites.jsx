// src/pages/Favorites.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Favorites.css"; // Importa o CSS externo

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = () => {
    axios
      .get("http://localhost:8000/favorites/")
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/favorites/${id}`);
      alert("Removido dos favoritos!");
      fetchFavorites(); // Atualiza lista
    } catch (err) {
      console.error(err);
      alert("Erro ao remover favorito.");
    }
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Meus Pokémons Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="no-favorites">Você ainda não favoritou nenhum pokémon.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav) => (
            <div className="favorite-card" key={fav.id}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${fav.pokemon_id}.png`}
                alt={fav.pokemon_name}
                className="favorite-image"
              />
              <h3 className="favorite-name">{fav.pokemon_name}</h3>
              <button onClick={() => handleRemove(fav.id)} className="remove-button">
                Remover
              </button>
            </div>
          ))}
        </div>
      )}

      <Link to="/" className="back-link">
        ← Voltar para a Home
      </Link>
    </div>
  );
}

export default Favorites;
