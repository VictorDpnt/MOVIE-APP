import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Cards = ({ movie }) => {
  const notation = Math.floor(movie.vote_average * 10);
  const dateFormateur = (date) => {
    let [yy, mm, dd] = date.split("-");
    return [dd, mm, yy].join("-");
  };

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
        <h5 className="date">{dateFormateur(movie.release_date)}</h5>
      </div>
    </div>
  );
};

export default Cards;
