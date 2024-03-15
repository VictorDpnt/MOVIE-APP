import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SimilarMovie from "./SimilarMovie";
import BandeAnnonceMovie from "./BandeAnnonceMovie";
import CreditMovie from "./CreditMovie";
import CrewInfos from "./CrewInfos";

const MovieInfos = () => {
  const [data, setData] = useState([]);
  const idUrl = window.location.pathname;
  const notation = Math.floor(data.vote_average * 10);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie${idUrl}?api_key=864b6602f4018630491e67fa714381e6&query=a&page=1&language=fr-FR`
      )
      .then((res) => setData(res.data));
  }, [data, idUrl]);

  const genreFinder = (genre) => {
    switch (genre) {
      case 28:
        genre = "action";
        break;
      case 12:
        genre = "Aventure";
        break;
      case 16:
        genre = "Animation";
        break;
      case 35:
        genre = "Comédie";
        break;
      case 80:
        genre = "Policier";
        break;
      case 99:
        genre = "Documentaire";
        break;
      case 18:
        genre = "Drame";
        break;
      case 10751:
        genre = "Famille";
        break;
      case 14:
        genre = "Fantasy";
        break;
      case 36:
        genre = "Historique";
        break;
      case 27:
        genre = "Horreur";
        break;
      case 10402:
        genre = "Music";
        break;
      case 9648:
        genre = "Mystère";
        break;
      case 10749:
        genre = "Romance";
        break;
      case 878:
        genre = "Science Fiction";
        break;
      case 10770:
        genre = "TV Show";
        break;
      case 53:
        genre = "Thriller";
        break;
      case 10752:
        genre = "Guerre ";
        break;
      case 37:
        genre = "Western";
        break;
      default:
        break;
    }
    return genre;
  };

  const hourFinder = (minute) => {
    let time = minute / 60;
    let fiedTime = time.toFixed(2);
    let timeStrng = fiedTime.toString();

    return timeStrng.replace(".", "h");
  };

  const getData = (date) => {
    let datee = date.toString();
    let newDate = datee.split("-");
    let mounth = "";

    if (newDate[1] == "01") {
      mounth = "Janvier";
    } else if (newDate[1] === "02") {
      mounth = "Février";
    } else if (newDate[1] === "03") {
      mounth = "Mars";
    } else if (newDate[1] === "04") {
      mounth = "Avril";
    } else if (newDate[1] === "05") {
      mounth = "Mai";
    } else if (newDate[1] === "06") {
      mounth = "Juin";
    } else if (newDate[1] === "07") {
      mounth = "Juillet";
    } else if (newDate[1] === "08") {
      mounth = "Août";
    } else if (newDate[1] === "09") {
      mounth = "Septembre";
    } else if (newDate[1] === "10") {
      mounth = "Octobre";
    } else if (newDate[1] === "11") {
      mounth = "Novembre";
    } else if (newDate[1] === "12") {
      mounth = "Décembre";
    }

    let realDate = `${newDate[2]} ${" "} ${mounth} ${" "} ${newDate[0]}`;

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
            <h1 className="title">{data.title}</h1>
            <div className="genre-date">
              {data.release_date && (
                <h4 className="date">{getData(data.release_date)} </h4>
              )}

              {data.genres
                ? data.genres.map((genre) => (
                    <li key={genre.id}>{genreFinder(genre.id)} </li>
                  ))
                : null}
              <h4 className="duration">{hourFinder(data.runtime)}</h4>
            </div>
            <div className="ba-circularBar">
              <div style={{ width: 60, height: 60 }}>
                <CircularProgressbar value={notation} text={`${notation}%`} />
              </div>
              <BandeAnnonceMovie movieId={data.id} />
            </div>

            <p className="tagline">{data.tagline ? data.tagline : null}</p>
            <div className="synopsis-container">
              <h4>Synopsis</h4>
              <p className="synopsis">{data.overview}</p>
            </div>
            <div className="budget-recette">
              {data.budget > 1 ? (
                <div className="budget">
                  <h6>Budget</h6>
                  <p> ${data.budget && data.budget.toLocaleString()}</p>
                </div>
              ) : null}
              {data.revenue > 1 ? (
                <div className="recette">
                  <h6>Recette</h6>
                  <p> ${data.revenue && data.revenue.toLocaleString()}</p>
                </div>
              ) : null}
            </div>
            <CrewInfos id={data.id} />
          </div>
        </div>
      </div>
      <CreditMovie movieId={data.id} />
      <SimilarMovie movieId={data.id} />
    </div>
  );
};

export default MovieInfos;
