import React, { useEffect, useState } from "react";
import CardsSeries from "./CardsSeries";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SeriesTendances = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, [data]);
  return (
    <div className="movie-tendance-container">
      <div className="choice">
        <p className="title-component"> Séries populaires</p>
      </div>

      <div className="movie-tendance-cards">
        {data.map((movie, index) => (
          <NavLink to={`/SeriesPopulaires/${movie.id}`}>
            <CardsSeries key={index} movie={movie} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SeriesTendances;
