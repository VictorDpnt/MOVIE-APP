import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CardsActors from "../../components/CardsActors";
import { NavLink } from "react-router-dom";

const ArtistesPopulaires = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/person/popular?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, []);
  return (
    <div className="now-playing">
      <Navbar />
      <div className="popular-container-actors">
        <div className="cards-container-actors">
          {data.slice(0, 18).map((actor, index) => (
            <NavLink to={`/ActeursPopulaires/${actor.id}`}>
              <CardsActors key={index} actor={actor} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistesPopulaires;
