import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Top10Series = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, []);
  return (
    <div className="top10">
      <div className="movieContainer">
        {data
          .slice(0, 10)
          // .filter((movie) => {
          //   if (movie.origin_country[0] === "US") {
          //     return movie;
          //   } else {
          //     return null;
          //   }
          // })
          .map((movie, index) => (
            <NavLink to={`/SeriesPopulaires/${movie.id}`}>
              <div className="card-top10">
                <div className="img">
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" + movie.poster_path
                    }
                    alt=""
                  />
                  <p>{index + 1}</p>
                </div>
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default Top10Series;
