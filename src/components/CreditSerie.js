import axios from "axios";
import React, { useEffect, useState } from "react";
import CardsActors from "./CardsActors";
import { NavLink } from "react-router-dom";

const CreditSerie = ({ movieId }) => {
  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (movieId) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${movieId}/aggregate_credits?api_key=864b6602f4018630491e67fa714381e6&page=1&language=fr-FR`
        );
        setData(response.data.cast);
      }
    };
    fetchData();
  }, [movieId]);

  const handleScroll = (direction) => {
    const container = document.querySelector(".credit-items ");
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
    <div className="credit-container">
      {data.length > 0 ? <h4>Têtes d'affiche</h4> : null}
      <div className="credit-items">
        {data
          .filter((movie) => {
            if (movie.profile_path) {
              return movie;
            } else {
              return null;
            }
          })
          .slice(0, 9)
          .map((actor, index) => (
            <NavLink to={`/ActeursPopulaires/${actor.id}`}>
              <CardsActors actor={actor} key={index} />
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

export default CreditSerie;
