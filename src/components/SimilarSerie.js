import axios from "axios";
import React, { useEffect, useState } from "react";
import CardsSeries from "./CardsSeries";
import { NavLink } from "react-router-dom";

const SimilarSerie = ({ movieId }) => {
  const [data, setData] = useState([]);
  const idMovie = movieId;
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (movieId) {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${idMovie}/recommendations?api_key=864b6602f4018630491e67fa714381e6&query=a&page=1&language=fr-FR`
        );
        setData(res.data.results);
      }
    };
    fetchData();
  }, [movieId]);

  const handleScroll = (direction) => {
    const container = document.querySelector(".similar-movies-container ");
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
      {data.length > 0 && (
        <div>
          <button className="prev" onClick={() => handleScroll("left")}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button className="next" onClick={() => handleScroll("right")}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default SimilarSerie;
