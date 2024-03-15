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
    } else {
      genreMedia = "Acteur";
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
      {data
        .sort((a, b) => b.popularity - a.popularity)
        .map((movie, index) => (
          <NavLink
            to={
              movie.media_type === "movie"
                ? `/${movie.id}`
                : movie.media_type === "tv"
                ? `/SeriesPopulaires/${movie.id}`
                : `/ActeursPopulaires/${movie.id}`
            }
          >
            <div key={index} className="results">
              <li>
                {movie.media_type === "movie"
                  ? movie.title
                  : movie.media_type === "tv"
                  ? movie.name
                  : movie.original_name}
              </li>
              {/* <li>{movie.title ? movie.title : movie.name}</li> */}
              <div className="details-search">
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
