import React, { useEffect, useState } from "react";
import CardsSeries from "./CardsSeries";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SeriesTendances = () => {
  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=864b6602f4018630491e67fa714381e6&page=1&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, [data]);

  const handleScroll = (direction) => {
    const container = document.getElementById("movie-tendance-cards");
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
        {/* <p className="title-component"> Séries du moment</p> */}
      </div>

      <div className="movie-tendance-cards" id="movie-tendance-cards">
        {data
          .filter((movie) => {
            if (movie.media_type === "tv") {
              return movie;
            } else {
              return null;
            }
          })
          .map((movie, index) => (
            <NavLink to={`/SeriesPopulaires/${movie.id}`}>
              <CardsSeries key={index} movie={movie} />
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

export default SeriesTendances;
