import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const CrewInfos = ({ id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          id ? id : 763215
        }/credits?api_key=864b6602f4018630491e67fa714381e6&page=1&language=fr-FR`
      )
      .then((res) => setData(res.data.crew));
  }, [data, id]);

  return (
    <div className="crew-container">
      {data
        .filter((movie) => {
          if (
            movie.job === "Original Music Composer" ||
            movie.job === "Director"
          ) {
            return movie;
          } else {
            return null;
          }
        })
        .map((movie) => (
          <NavLink to={`/ActeursPopulaires/${movie.id}`}>
            <div className="crew">
              <div className="director">
                {movie.job === "Director" ? <h5>Réalisateur</h5> : null}
                {movie.job === "Director" ? <p>{movie.original_name}</p> : null}
              </div>

              <div className="music">
                {movie.job === "Original Music Composer" ? (
                  <h5>Compositeur</h5>
                ) : null}
                {movie.job === "Original Music Composer" ? (
                  <p>{movie.original_name}</p>
                ) : null}
              </div>
            </div>
          </NavLink>
        ))}
    </div>
  );
};

export default CrewInfos;
