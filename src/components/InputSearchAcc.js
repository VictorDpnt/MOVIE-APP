import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const InputSearchAcc = ({ inputSearch }) => {
  const [data, setData] = useState([]);

  const mediaGenre = (genre) => {
    let genreMedia = "";
    if (genre === "tv") {
      genreMedia = "Série";
    } else if (genre === "movie") {
      genreMedia = "Film";
    }
    return genreMedia;
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=864b6602f4018630491e67fa714381e6&query=${inputSearch}&page=1&language=fr-FR`
      )
      .then((res) => setData(res.data.results));
  }, [data, inputSearch]);

  return (
    <div className="window-containt2">
      {data.map((movie, index) => (
        <NavLink
          to={
            movie.media_type === "movie2"
              ? `/${movie.id}`
              : movie.media_type === "tv2"
              ? `/SeriesPopulaires/${movie.id}`
              : `/ActeursPopulaires/${movie.id}`
          }
        >
          <div key={index} className="results2">
            <li>{movie.title ? movie.title : movie.name}</li>
            <div className="details-search2">
              <p>{mediaGenre(movie.media_type)}</p>
              {movie.release_date ? (
                <p className="date2">{movie.release_date}</p>
              ) : (
                <p className="date2">{movie.first_air_date}</p>
              )}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default InputSearchAcc;
