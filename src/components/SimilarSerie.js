import axios from "axios";
import React, { useEffect, useState } from "react";
import CardsSeries from "./CardsSeries";
import { NavLink } from "react-router-dom";

const SimilarSerie = ({ movieId }) => {
  const [data, setData] = useState([]);
  const idMovie = movieId;

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/tv/${
            idMovie ? idMovie : 1402
          }/recommendations?api_key=864b6602f4018630491e67fa714381e6&query=a&page=1&language=fr-FR`
        )
        .then((res) => setData(res.data.results));
    };

    getData();
  }, [data, idMovie]);

  return (
    <div className="similar">
      {data.length > 0 ? <h4>Titres similaires</h4> : null}
      <div className="similar-movies-container">
        {data
          .filter((movie) => {
            if (movie.poster_path) {
              return movie;
            } else {
              return null;
            }
          })
          .filter((item, index) => {
            return index === data.findIndex((item2) => item2.id === item.id);
          })
          .map((movie, index) => (
            <NavLink to={`/SeriesPopulaires/${movie.id}`}>
              <CardsSeries key={index} movie={movie} />
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default SimilarSerie;
