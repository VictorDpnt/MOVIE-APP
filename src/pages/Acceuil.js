import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MovieTendance from "../components/MovieTendance";
import ArtistesTendance from "../components/ArtistesTendance";
import SeriesTendances from "../components/SeriesTendances";
import Footer from "../components/Footer";
import Top10Movie from "../components/Top10Movie";

const Acceuil = () => {
  const [inputSearch, setInputSearch] = useState("");
  let imgAcc = Math.floor(Math.random() * 4);

  return (
    <div className="acceuil">
      <Navbar inputSearch={inputSearch} />
      <div className="img-acceuil">
        <img
          src={
            imgAcc === 0
              ? "./img/interstelar.jpeg"
              : imgAcc === 1
              ? "./img/avatarbg.jpeg"
              : imgAcc === 2
              ? "./img/dune.jpeg"
              : "./img/onepiece.jpeg"
          }
          alt=""
        />
        <h3>
          <span>Bienvenue,</span>
          <br />
          Des millions de films, émissions télévisées et artistes...
        </h3>
        <div className="search-container"></div>
      </div>
      <MovieTendance />
      <p className="top10title">Top 10 des films de la semaine </p>
      <Top10Movie />
      <SeriesTendances />
      <ArtistesTendance />
      <Footer />
    </div>
  );
};

export default Acceuil;
