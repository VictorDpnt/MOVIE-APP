import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import ActorsCrédits from "./ActorsCrédits";

const ActorsInfos = () => {
  const [data, setData] = useState([]);
  const idUrl = window.location.pathname;
  const getId = (id) => {
    let idSerie = id.split("/")[2];
    return idSerie;
  };
  const id = getId(idUrl);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR`
      )
      .then((res) => setData(res.data));
  }, [id]);

  function convertDate(dateString) {
    var months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    var date = new Date(dateString);

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }

    var formattedDate = day + " " + months[monthIndex] + " " + year;

    return formattedDate;
  }

  return (
    <div className="actors-infos-container">
      <Navbar />
      <div className="artistes-infos">
        <div className="left-part">
          <img
            src={"https://image.tmdb.org/t/p/original" + data.profile_path}
            alt=""
          />
          <div className="info-perso">
            <div className="dob">
              <h6>Date de naissance</h6>
              <p>{convertDate(data.birthday)}</p>
            </div>
            <div className="pob">
              <h6>Lieu de naissance</h6>
              <p>{data.place_of_birth}</p>
            </div>
          </div>
        </div>
        <div className="right-part">
          <h1 className="name">{data.name}</h1>
          {data.biography ? (
            <div className="bio">
              <h5>Biographie</h5>
              <p>{data.biography}</p>
            </div>
          ) : (
            "Pas de biographie disponible "
          )}

          <ActorsCrédits />
        </div>
      </div>
    </div>
  );
};

export default ActorsInfos;
