import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { NavLink } from "react-router-dom";

const SimilarMovie = ({ movieId }) => {
  const [data, setData] = useState([]);
  const idMovie = movieId;

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${
            idMovie ? idMovie : 969492
          }/recommendations?api_key=864b6602f4018630491e67fa714381e6&query=a&page=1&language=fr-FR`
        )
        .then((res) => setData(res.data.results));
    };

    getData();
  }, [data, idMovie]);

  return (
    <div className="similar">
      <h4>Titres similaires</h4>
      <div className="similar-movies-container">
        {data
          .filter((movie) => {
            if (
              movie.original_language === "en" ||
              movie.original_language === "fr"
            ) {
              return movie;
            } else {
              return null;
            }
          })
          .filter((movie) => {
            if (movie.poster_path) {
              return movie;
            } else {
              return null;
            }
          })
          .map((movie, index) => (
            <NavLink to={`/${movie.id}`}>
              <Cards key={index} movie={movie} />
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default SimilarMovie;
