import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Cards from "../../components/Cards";
import { NavLink } from "react-router-dom";

const Series = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, []);
  return (
    <div className="top-rated">
      <Navbar />
      <div className="popular-container">
        <div className="filters">
          <h1>FILTERS</h1>
        </div>
        <div className="cards-container">
          {data.map((movie) => (
            <NavLink to={`/${movie.id}`}>
              <Cards key={movie.id} movie={movie} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Series;
