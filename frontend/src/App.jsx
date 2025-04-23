import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" className="home-link">Home</Link> | <Link to="/favorites" className="home-link">Favoritos</Link >
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
