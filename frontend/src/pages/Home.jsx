// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css"; // Importa o arquivo CSS

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/pokemons")
      .then((res) => setPokemons(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleFavorite = async (name, index) => {
    const newFavorite = {
      pokemon_name: name,
      pokemon_id: index + 1, // pokéAPI usa índice como ID
    };

    try {
      // Verifica se o Pokémon já existe nos favoritos
      const response = await axios.get("http://localhost:8000/favorites/");
      const existingFavorite = response.data.find(
        (fav) => fav.pokemon_id === newFavorite.pokemon_id
      );

      if (existingFavorite) {
        alert(`${name} já está nos seus favoritos!`);
      } else {
        // Se não estiver, adiciona nos favoritos
        await axios.post("http://localhost:8000/favorites/", newFavorite);
        alert(`${name} adicionado aos favoritos!`);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao favoritar.");
    }
  };

  // Filtra os pokemons conforme a barra de pesquisa
  const filteredPokemons = pokemons.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Lista de Pokémons</h1>

      <input
        type="text"
        placeholder="Pesquisar pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="pokemon-list">
        {filteredPokemons.map((poke, index) => (
          <div className="pokemon-card" key={poke.name}>
            <img src={poke.image} alt={poke.name} className="pokemon-image" />
            <h3>{poke.name}</h3>
            <button onClick={() => handleFavorite(poke.name, index)}>
              Favoritar
            </button>
          </div>
        ))}
      </div>
      <Link to="/favorites" className="favorites-link">
        Ver meus favoritos →
      </Link>
    </div>
  );
}

export default Home;
