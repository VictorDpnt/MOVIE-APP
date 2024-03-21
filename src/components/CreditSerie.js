import axios from "axios";
import React, { useEffect, useState } from "react";
import CardsActors from "./CardsActors";
import { NavLink } from "react-router-dom";

const CreditSerie = ({ movieId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${
          movieId ? movieId : 1399
        }/aggregate_credits?api_key=864b6602f4018630491e67fa714381e6&page=1&language=fr-FR`
      )
      .then((res) => setData(res.data.cast));
  }, [movieId, data]);
  return (
    <div className="credit-container">
      {data.length > 0 ? <h4>Têtes d'affiche</h4> : null}
      <div className="credit-items">
        {data
          .filter((movie) => {
            if (movie.profile_path) {
              return movie;
            } else {
              return null;
            }
          })
          .slice(0, 9)
          .map((actor, index) => (
            <NavLink to={`/ActeursPopulaires/${actor.id}`}>
              <CardsActors actor={actor} key={index} />
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default CreditSerie;
