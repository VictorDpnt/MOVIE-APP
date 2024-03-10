import axios from "axios";
import React, { useEffect, useState } from "react";
import CardsActors from "./CardsActors";
import { NavLink } from "react-router-dom";

const ArtistesTendance = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/person/popular?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, [data]);
  return (
    <div className="artistes-tendance-container">
      <div className="title-containt">Artistes populaires</div>
      <div className="artiste-tendance-cards">
        {data.map((actor, index) => (
          <NavLink to={`/ActeursPopulaires/${actor.id}`}>
            <CardsActors key={index} actor={actor} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ArtistesTendance;
