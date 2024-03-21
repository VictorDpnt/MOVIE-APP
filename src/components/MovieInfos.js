import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SimilarMovie from "./SimilarMovie";
import BandeAnnonceMovie from "./BandeAnnonceMovie";
import CreditMovie from "./CreditMovie";
import CrewInfos from "./CrewInfos";
import Providers from "./Providers";
import Footer from "./Footer";

const MovieInfos = () => {
  const [data, setData] = useState([]);
  const idUrl = window.location.pathname;
  const notation = Math.floor(data.vote_average * 10);
  const [showProvider, setShowPovider] = useState(false);
  const [checkStorage, setCheckStorage] = useState(false);

  const isValueInLocalStorage = () => {
    const storedValue = localStorage.getItem("movies");

    if (storedValue !== null && storedValue.includes(data.id)) {
      setCheckStorage(true);
    } else {
      setCheckStorage(false);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie${idUrl}?api_key=864b6602f4018630491e67fa714381e6&query=a&page=1&language=fr-FR`
      )
      .then((res) => setData(res.data));

    isValueInLocalStorage();
  }, [idUrl, data]);

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

    if (newDate[1] === "01") {
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
  const addStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    if (!storedData.includes(data.id.toString())) {
      storedData.push(data.id);
      window.localStorage.movies = storedData;
    }
  };
  const deleteItemFromLocalStorage = () => {
    const moviesArray = localStorage.getItem("movies").split(",");
    const newArray = moviesArray.filter((element) => element !== `${data.id}`);

    localStorage.setItem("movies", newArray);
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

          <div className={showProvider ? "details active" : "details"}>
            <div className="title-like">
              <h1 className="title">{data.title}</h1>
              {checkStorage ? (
                <div
                  className="heart-liked"
                  onClick={() => deleteItemFromLocalStorage()}
                ></div>
              ) : (
                <div
                  className="heart-NotLiked"
                  onClick={() => {
                    addStorage();
                  }}
                ></div>
              )}
            </div>

            <div className="genre-date">
              {data.release_date && (
                <h4 className="date">{getData(data.release_date)} </h4>
              )}

              {data.genres
                ? data.genres.map((genre, index) => (
                    <li key={index}>{genreFinder(genre.id)} </li>
                  ))
                : null}
              <h4 className="duration">{hourFinder(data.runtime)}</h4>
            </div>
            <div className="ba-circularBar">
              <div
                className="notation"
                style={{ width: 60, height: 60 }}
                background={"#141414"}
              >
                <CircularProgressbar
                  value={notation}
                  text={`${notation}%`}
                  strokeWidth={15}
                  styles={{
                    root: { width: "100%" },
                    path: {
                      stroke:
                        notation > 66
                          ? "#1ABC9C"
                          : notation > 33
                          ? "#F39C12"
                          : "#E74C3C",
                    },
                    trail: {
                      stroke: "#141414",
                    },
                    text: {
                      fill: "#f0f0f0",
                      fontSize: "30px",
                      fontWeight: "bold",
                    },
                  }}
                />
              </div>
              <BandeAnnonceMovie movieId={data.id} />
              <div
                className="offers-providers"
                onClick={() => setShowPovider(true)}
              >
                <h4 className="show-providers">Voir les offres</h4>
                <img src="./img/icon-camera.png" alt="" />
              </div>
            </div>

            <p className="tagline">{data.tagline ? data.tagline : null}</p>
            {data.overview ? (
              <div className="synopsis-container">
                <h4>Synopsis</h4>
                <p className="synopsis">{data.overview}</p>
              </div>
            ) : null}
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
              <CrewInfos id={data.id} />
            </div>
          </div>
          {showProvider && (
            <div className="providers-container">
              <h1 className="title">{data.title}</h1>
              <div className="genre-date">
                {data.release_date && (
                  <h4 className="date">{getData(data.release_date)} </h4>
                )}

                {data.genres
                  ? data.genres.map((genre, index) => (
                      <li key={index}>{genreFinder(genre.id)} </li>
                    ))
                  : null}
                <h4 className="duration">{hourFinder(data.runtime)}</h4>
              </div>

              <Providers movieId={data.id} movieTitle={data.title} />
              <p
                className="close-providers"
                onClick={() => setShowPovider(!showProvider)}
              >
                X
              </p>
            </div>
          )}
        </div>
      </div>
      <CreditMovie movieId={data.id} />
      <SimilarMovie movieId={data.id} />
      <Footer />
    </div>
  );
};

export default MovieInfos;
