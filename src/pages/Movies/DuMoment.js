import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Cards from "../../components/Cards";
import { NavLink } from "react-router-dom";

const Artistes = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, []);
  return (
    <div className="now-playing">
      <Navbar />
      <div className="popular-container">
        <div className="filters">
          <h1>FILTERS</h1>
        </div>
        <div className="cards-container">
          {data.map((movie, index) => (
            <NavLink to={`/${movie.id}`}>
              <Cards key={index} movie={movie} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artistes;
