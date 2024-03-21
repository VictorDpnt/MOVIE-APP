import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Cards from "./Cards";
import axios from "axios";
import { NavLink } from "react-router-dom";

const MaListe = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            moviesId[i] +
            "?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR"
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);

  return (
    <div className="fav-page">
      <Navbar />
      <h2>Ma liste de films</h2>
      <ul className="catalogue">
        {listData.length > 0 ? (
          listData
            .filter((item, index) => {
              return (
                index === listData.findIndex((item2) => item2.id === item.id)
              );
            })
            .map((movie, index) => (
              <NavLink to={`/${movie.id}`}>
                <Cards movie={movie} key={index} />
              </NavLink>
            ))
        ) : (
          <h2> Aucun film à votre list</h2>
        )}
      </ul>
    </div>
  );
};

export default MaListe;
