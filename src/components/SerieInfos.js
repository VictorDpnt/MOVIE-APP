import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SimilarSerie from "./SimilarSerie";

const SerieInfos = () => {
  const [data, setData] = useState([]);
  const idUrl = window.location.pathname;
  const notation = Math.floor(data.vote_average * 10);

  const getId = (id) => {
    let idSerie = id.split("/")[2];

    return idSerie;
  };
  const id = getId(idUrl);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR`
      )
      .then((res) => setData(res.data));
  }, [data, idUrl]);

  const genreFinder = (genre) => {
    switch (genre) {
      case 10759:
        genre = "Action & Adventure";
        break;
      case 16:
        genre = "Animation";
        break;
      case 35:
        genre = "Comédie";
        break;
      case 80:
        genre = "Crime";
        break;
      case 99:
        genre = "Documentaire";
        break;
      case 18:
        genre = "Drame";
        break;
      case 10751:
        genre = "Familial";
        break;
      case 10762:
        genre = "Kids";
        break;
      case 9648:
        genre = "Mystère";
        break;
      case 10763:
        genre = "News";
        break;
      case 10764:
        genre = "Reality";
        break;
      case 10765:
        genre = "Science-Fiction & Fantastique";
        break;
      case 10766:
        genre = "Soap";
        break;
      case 10767:
        genre = "Talk";
        break;
      case 10768:
        genre = "War & Politics";
        break;
      case 37:
        genre = "Western";
        break;
      default:
        break;
    }
    return genre;
  };

  const getData = (date) => {
    let datee = date.toString();
    let newDate = datee.split("-");
    let realDate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];

    return realDate;
  };
  return (
    <div className="movie-infos">
      <Navbar />
      <div className="main-infos">
        <div className="img-background">
          <img
            src={"https://image.tmdb.org/t/p/original" + data.backdrop_path}
            alt=""
          />
        </div>
        <div className="infos-containt">
          <div className="img-movie">
            <img
              src={"https://image.tmdb.org/t/p/original" + data.poster_path}
              alt=""
            />
          </div>
          <div className="details">
            <h1 className="title">{data.name}</h1>
            <div className="genre-date">
              {data.first_air_date && (
                <h4 className="date">{getData(data.first_air_date)}</h4>
              )}

              {data.genres
                ? data.genres.map((genre) => (
                    <li key={genre.id}>{genreFinder(genre.id)} </li>
                  ))
                : null}
            </div>
            <h4 className="duration">
              Nombre de saisons : {data.number_of_seasons}
            </h4>
            <div style={{ width: 60, height: 60 }}>
              <CircularProgressbar value={notation} text={`${notation}%`} />
            </div>
            <p className="tagline">{data.tagline ? data.tagline : null}</p>
            <div className="synopsis-container">
              <h4>Synopsis</h4>
              <p className="synopsis">{data.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <SimilarSerie movieId={data.id} />
    </div>
  );
};

export default SerieInfos;
