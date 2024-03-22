import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Top10Series = () => {
  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, []);

  const handleScroll = (direction) => {
    const container = document.getElementById("movieContainer");
    const scrollAmount = 200;
    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
      setScrollPosition(container.scrollLeft);
    } else {
      container.scrollLeft += scrollAmount;
      setScrollPosition(container.scrollLeft);
    }
  };
  return (
    <div className="top10">
      <div className="movieContainer" id="movieContainer">
        {data.slice(0, 10).map((movie, index) => (
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
      <button className="prev" onClick={() => handleScroll("left")}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <button className="next" onClick={() => handleScroll("right")}>
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};

export default Top10Series;
