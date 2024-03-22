import React, { useEffect, useState } from "react";
import CardsSeries from "./CardsSeries";
import axios from "axios";
import { NavLink } from "react-router-dom";

const GenreSeries = ({ genre }) => {
  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=864b6602f4018630491e67fa714381e6&include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=${genre}`
      )
      .then((res) => setData(res.data.results));
  }, [data]);

  const handleScroll = (direction) => {
    const container = document.getElementById(`${genre}`);
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

      <div className="movie-tendance-cards" id={genre}>
        {data.map((movie, index) => (
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

export default GenreSeries;
