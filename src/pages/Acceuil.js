import React, { useState } from "react";
import Navbar from "../components/Navbar";
import MovieTendance from "../components/MovieTendance";
import ArtistesTendance from "../components/ArtistesTendance";
import SeriesTendances from "../components/SeriesTendances";
import Footer from "../components/Footer";
import Top10Movie from "../components/Top10Movie";
import Top10Series from "../components/Top10Series";
import Caroussel from "../components/Caroussel";
import GenreMovieacc from "../components/GenreMovieacc";
import GenreTVacc from "../components/GenreTVacc";
import MovieGenre from "../components/MovieGenre";
import GenreSeries from "../components/GenreSeries";

const Acceuil = () => {
  const [inputSearch, setInputSearch] = useState("");
  let imgAcc = Math.floor(Math.random() * 4);

  return (
    <div className="acceuil">
      <Navbar inputSearch={inputSearch} />
      <div className="img-acceuil">
        <Caroussel />
      </div>
      <MovieTendance />
      <p className="top10title">Top 10 des films de la semaine </p>
      <Top10Movie />
      <p className="top10title">Actions - Films </p>
      <GenreMovieacc genre={28} />
      <p className="top10title">Séries du moment </p>
      <SeriesTendances />
      <p className="top10title">Top 10 des séries les mieux notées </p>
      <Top10Series />
      <p className="top10title">War & Politics - Séries </p>
      <GenreSeries genre={10768} />
      <p className="top10title">Animations - Séries </p>
      <GenreTVacc genre={16} />
      <p className="top10title">Fantastiques - Films </p>
      <MovieGenre genre={14} />
      <p className="top10title">Guerres - Films </p>
      <GenreMovieacc genre={10752} />
      <p className="top10title">Western - Séries </p>
      <GenreSeries genre={37} />
      <p className="top10title">Musiques - Films </p>
      <MovieGenre genre={10402} />
      <p className="top10title">Historiques - Films </p>
      <GenreMovieacc genre={36} />
      <p className="top10title">Enfants - Séries </p>
      <GenreSeries genre={10762} />
      <p className="top10title">Drame - Séries </p>
      <GenreTVacc genre={18} />
      <p className="top10title">Artistes en tendance </p>
      <ArtistesTendance />
      <Footer />
    </div>
  );
};

export default Acceuil;
