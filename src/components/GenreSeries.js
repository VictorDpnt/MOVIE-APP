import React, { useRef, useState } from "react";
import CardsSeries from "./CardsSeries";
import { NavLink } from "react-router-dom";

const GenreSeries = ({ data }) => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const container = containerRef.current;
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
    <div className="movie-tendance-container">
      <div className="choice">
        {/* <p className="title-component"> Séries du moment</p> */}
      </div>

      <div className="movie-tendance-cards" ref={containerRef}>
        {data?.map((movie, index) => (
          <NavLink to={`/SeriesPopulaires/${movie.id}`} key={movie.id}>
            <CardsSeries key={index} movie={movie} />
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

export default GenreSeries;
