import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { NavLink } from "react-router-dom";

const MovieTendance = () => {
  const [movieTendance, setMovieTendance] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=864b6602f4018630491e67fa714381e6&page=1&language=fr-FR"
      )
      .then((res) => setMovieTendance(res.data.results));
  }, [movieTendance]);
  return (
    <div className="movie-tendance-container">
      <div className="choice">
        <p className="title-component"> Films en tendances</p>
      </div>

      <div className="movie-tendance-cards">
        {movieTendance
          .filter((movie) => {
            if (
              movie.original_language === "en" ||
              movie.original_language === "fr" ||
              movie.original_language === "ko"
            ) {
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

export default MovieTendance;
