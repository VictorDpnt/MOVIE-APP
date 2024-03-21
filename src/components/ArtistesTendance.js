import axios from "axios";
import React, { useEffect, useState } from "react";
import CardsActors from "./CardsActors";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const ArtistesTendance = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/person/popular?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR"
      )
      .then((res) => setData(res.data.results));
  }, [data]);

  const customScrollOptions = {
    wheelSpeed: 2, // Vitesse de défilement avec la souris
    wheelPropagation: true, // Permettre à la molette de la souris de déclencher le défilement parent
    minScrollbarLength: 20, // Longueur minimale de la barre de défilement
    suppressScrollY: true, // Désactiver la barre de défilement horizontale
    scrollYMarginOffset: 10, // Décalage de marge pour la barre de défilement verticale
    handlers: ["click-rail", "drag-thumb", "wheel", "touch"], // Gestionnaires d'événements pour la barre de défilement
  };

  return (
    <PerfectScrollbar options={customScrollOptions}>
      <div className="artistes-tendance-container">
        <div className="title-containt">Artistes populaires</div>
        <div className="artiste-tendance-cards">
          {data.map((actor, index) => (
            <NavLink to={`/ActeursPopulaires/${actor.id}`}>
              <CardsActors key={index} actor={actor} />
            </NavLink>
          ))}
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default ArtistesTendance;
