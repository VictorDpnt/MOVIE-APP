import React from "react";
import Navbar from "../components/Navbar";
import MovieTendance from "../components/MovieTendance";
import ArtistesTendance from "../components/ArtistesTendance";
import SeriesTendances from "../components/SeriesTendances";

const Acceuil = () => {
  return (
    <div className="acceuil">
      <Navbar />
      <div className="img-acceuil">
        <img src="./img/interstelar.jpeg" alt="" />
        <h3>
          <span>Bienvenue,</span>
          <br />
          Des millions de films, émissions télévisées et artistes...
        </h3>
      </div>
      <MovieTendance />
      <SeriesTendances />
      <ArtistesTendance />
    </div>
  );
};

export default Acceuil;
