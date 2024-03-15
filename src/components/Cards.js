import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Cards = ({ movie }) => {
  const notation = Math.floor(movie.vote_average * 10);
  const dateFormateur = (date) => {
    let dateIso = new Date(date);
    // let [yy, mm, dd] = date.split("-");
    // return [dd, mm, yy].join("-");
  };

  function convertDate(dateString) {
    // Tableau des noms de mois en français
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
    <div className="card-container">
      <div className="img">
        <img
          src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
          alt=""
        />
      </div>
      <div className="infos">
        <div className="notation" style={{ width: 35, height: 35 }}>
          <CircularProgressbar value={notation} text={`${notation}%`} />
        </div>
        <h1 className="movie-title">{movie.title}</h1>
        <h5 className="date">{convertDate(movie.release_date)}</h5>
      </div>
    </div>
  );
};

export default Cards;
