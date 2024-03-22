import axios from "axios";
import React, { useEffect, useState } from "react";
import CardsActors from "./CardsActors";
import { NavLink } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";

const ArtistesTendance = () => {
  const [data, setData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/person/popular?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, [data]);

  const handleScroll = (direction) => {
    const container = document.getElementById(`artiste-scroll`);
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
    <div className="artistes-tendance-container">
      <div className="artiste-tendance-cards" id="artiste-scroll">
        {data.map((actor, index) => (
          <NavLink to={`/ActeursPopulaires/${actor.id}`}>
            <CardsActors key={index} actor={actor} />
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

export default ArtistesTendance;
