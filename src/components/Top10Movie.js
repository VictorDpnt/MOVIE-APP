import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Top10Movie = () => {
  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=864b6602f4018630491e67fa714381e6"
      )
      .then((res) => setData(res.data.results));
  }, []);

  const handleScroll = (direction) => {
    const container = document.querySelector(".movieContainer");
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
      <div className="movieContainer">
        {data.slice(0, 10).map((movie, index) => (
          <NavLink to={`/${movie.id}`}>
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

export default Top10Movie;
