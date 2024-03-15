import axios from "axios";
import React, { useEffect, useState } from "react";
import CardsFamourfor from "./CardsFamourfor";
import { NavLink } from "react-router-dom";

const ActorsCrédits = () => {
  const [data, setData] = useState([]);
  const idUrl = window.location.pathname;
  const getId = (id) => {
    let idSerie = id.split("/")[2];
    return idSerie;
  };
  const id = getId(idUrl);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR`
      )
      .then((res) => setData(res.data.cast));
  }, [data, id]);
  return (
    <div>
      <h1>Célèbre pour</h1>
      <h3 className="type">Films</h3>
      <div className="mini-cards-container">
        {data
          .filter((movie) => {
            if (movie.title) {
              return movie;
            } else {
              return null;
            }
          })
          .filter((movie) => {
            if (movie.genre_ids[0] === 35 || movie.genre_ids[1] === 35) {
              return null;
            } else {
              return movie;
            }
          })
          .filter((movie) => {
            if (movie.poster_path) {
              return movie;
            } else {
              return null;
            }
          })
          .sort((a, b) => b.popularity - a.popularity)
          .map((movie, index) => (
            <NavLink to={`/${movie.id}`}>
              <CardsFamourfor key={index} movie={movie} />
            </NavLink>
          ))}
      </div>
      <h3 className="type">Séries</h3>
      <div className="mini-cards-container">
        {data
          .filter((movie) => {
            if (movie.media_type === "tv") {
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
          .filter((movie) => {
            if (
              movie.genre_ids[0] === 10763 ||
              movie.genre_ids[1] === 10763 ||
              movie.genre_ids[0] === 10767 ||
              movie.genre_ids[1] === 10767
            ) {
              return null;
            } else {
              return movie;
            }
          })
          .sort((a, b) => b.popularity - a.popularity)
          .map((movie, index) => (
            <NavLink to={`/SeriesPopulaires/${movie.id}`}>
              <CardsFamourfor key={index} movie={movie} />
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default ActorsCrédits;
