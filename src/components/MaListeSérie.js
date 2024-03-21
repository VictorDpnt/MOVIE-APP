import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Cards from "./Cards";
import axios from "axios";
import { NavLink } from "react-router-dom";
import CardsSeries from "./CardsSeries";

const MaListeSérie = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.series
      ? window.localStorage.series.split(",")
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          "https://api.themoviedb.org/3/tv/" +
            moviesId[i] +
            "?api_key=ed82f4c18f2964e75117c2dc65e2161d&language=fr-FR"
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);

  return (
    <div className="fav-page">
      <Navbar />
      <h2>Ma liste de séries</h2>
      <ul className="catalogue">
        {listData.length > 0 ? (
          listData
            .filter((item, index) => {
              return (
                index === listData.findIndex((item2) => item2.id === item.id)
              );
            })
            .map((movie, index) => (
              <NavLink to={`/SeriesPopulaires/${movie.id}`}>
                <CardsSeries movie={movie} key={index} />
              </NavLink>
            ))
        ) : (
          <h2> Aucune série à votre liste</h2>
        )}
      </ul>
    </div>
  );
};

export default MaListeSérie;
