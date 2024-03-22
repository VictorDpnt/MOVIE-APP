import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { NavLink } from "react-router-dom";

const MovieTendance = () => {
  const [movieTendance, setMovieTendance] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setMovieTendance(res.data.results));
  }, []);

  const handleScroll = (direction) => {
    const container = document.querySelector(".movie-tendance-cards");
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
      setScrollPosition(container.scrollLeft);
    } else {
      container.scrollLeft += scrollAmount;
      setScrollPosition(container.scrollLeft);
    }
  };

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
          .filter((movie) => {
            if (movie.media_type === "movie") {
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
      <button className="prev" onClick={() => handleScroll("left")}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <button className="next" onClick={() => handleScroll("right")}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default MovieTendance;
