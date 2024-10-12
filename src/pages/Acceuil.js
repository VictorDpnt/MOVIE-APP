import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [dataGenreMovieAcc, setDataGenreMovieAcc] = useState([]);
  const [dataGenreSerieAcc, setDataGenreSerieAcc] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const genreIdsMovie = [28, 10752, 36];
    const genreIdsSerie = [10768, 37, 10762];

    const fetchGenresData = async () => {
      try {
        const genreRequests = genreIdsMovie.map((id) =>
          axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=864b6602f4018630491e67fa714381e6&include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=${id}`
          )
        );
        const responses = await Promise.all(genreRequests);

        const genres = {};
        genreIdsMovie.forEach((id, index) => {
          genres[id] = responses[index].data;
        });

        setDataGenreMovieAcc(genres);
      } catch (error) {
        console.error("Erreur lors de la récupération des genres:", error);
      }
    };

    const fetchGenresDataSerie = async () => {
      try {
        const genreRequests = genreIdsSerie.map((id) =>
          axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=864b6602f4018630491e67fa714381e6&include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=${id}`
          )
        );
        const responses = await Promise.all(genreRequests);

        const genres = {};
        genreIdsSerie.forEach((id, index) => {
          genres[id] = responses[index].data;
        });

        setDataGenreSerieAcc(genres);
      } catch (error) {
        console.error("Erreur lors de la récupération des genres:", error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchGenresData(), fetchGenresDataSerie()]);
      setLoading(false); // Met à jour `loading` après que tout est chargé
    };

    fetchData();
  }, []);

  return (
    <div className="acceuil">
      <Navbar inputSearch={inputSearch} />
      {loading ? (
        <div className="loader">Chargement...</div>
      ) : (
        <>
          <div className="img-acceuil">
            <Caroussel />
          </div>
          <MovieTendance />
          <p className="top10title">Top 10 des films de la semaine </p>
          <Top10Movie />
          <p className="top10title">Actions - Films </p>
          {dataGenreMovieAcc[28]?.results && (
            <GenreMovieacc data={dataGenreMovieAcc[28].results} />
          )}
          <p className="top10title">Séries du moment </p>
          <SeriesTendances />
          <p className="top10title">Top 10 des séries les mieux notées </p>
          <Top10Series />
          <p className="top10title">War & Politics - Séries </p>
          {dataGenreSerieAcc[10768]?.results && (
            <GenreSeries data={dataGenreSerieAcc[10768].results} />
          )}
          <p className="top10title">Animations - Séries </p>
          <GenreTVacc genre={16} />
          <p className="top10title">Fantastiques - Films </p>
          <MovieGenre genre={14} />
          <p className="top10title">Guerres - Films </p>
          {dataGenreMovieAcc[10752]?.results && (
            <GenreMovieacc data={dataGenreMovieAcc[10752].results} />
          )}
          <p className="top10title">Western - Séries </p>
          {dataGenreSerieAcc[37]?.results && (
            <GenreSeries data={dataGenreSerieAcc[37].results} />
          )}
          <p className="top10title">Musiques - Films </p>
          <MovieGenre genre={10402} />
          <p className="top10title">Historiques - Films </p>
          {dataGenreMovieAcc[36]?.results && (
            <GenreMovieacc data={dataGenreMovieAcc[36].results} />
          )}
          <p className="top10title">Enfants - Séries </p>
          {dataGenreSerieAcc[10762]?.results && (
            <GenreSeries data={dataGenreSerieAcc[10762].results} />
          )}
          <p className="top10title">Drame - Séries </p>
          <GenreTVacc genre={18} />
          <p className="top10title">Artistes en tendance </p>
          <ArtistesTendance />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Acceuil;
