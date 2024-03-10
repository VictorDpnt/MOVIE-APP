import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SearchWindow = ({ inputSearch }) => {
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
    <div className="window-containt">
      {data.map((movie, index) => (
        <NavLink
          // onClick={() => {
          //   if (movie.media_type === "tv") {
          //     return (suce = `/SeriesPopulaires/${movie.id}`);
          //   } else if (movie.media_type === "movie") {
          //     return (suce = `/${movie.id}`);
          //   } else if (movie.media_type === "person") {
          //     return (suce = `/ActeursPopulaires/${movie.id}`);
          //   }
          // }}

          to={movie.title ? `/${movie.id}` : `/SeriesPopulaires/${movie.id}`}
        >
          <div key={index} className="results">
            <li>{movie.title ? movie.title : movie.name}</li>
            <div className="details-search">
              <p className="tiret"> - </p>
              <p>{mediaGenre(movie.media_type)}</p>
              {movie.release_date ? (
                <p className="date">{movie.release_date}</p>
              ) : (
                <p className="date">{movie.first_air_date}</p>
              )}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default SearchWindow;
