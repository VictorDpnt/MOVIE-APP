import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import SimilarSerie from "./SimilarSerie";
import CreditSerie from "./CreditSerie";
import ProvidersSeries from "./ProvidersSeries";
import Footer from "./Footer";

const SerieInfos = () => {
  const [data, setData] = useState([]);
  const idUrl = window.location.pathname;
  const notation = Math.floor(data.vote_average * 10);
  const [showProvider, setShowPovider] = useState(false);
  const [checkStorage, setCheckStorage] = useState(false);
  // const [region, setRegion] = useState("fr-FR");

  const isValueInLocalStorage = () => {
    const storedValue = localStorage.getItem("series");
    // Vérifie si la valeur récupérée est non nulle et si elle contient la valeur à vérifier
    if (storedValue !== null && storedValue.includes(data.id)) {
      setCheckStorage(true);
    } else {
      setCheckStorage(false);
    }
  };

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

    isValueInLocalStorage();
  }, [data, id]);

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

  // const getData = (date) => {
  //   let datee = date.toString();
  //   let newDate = datee.split("-");
  //   let realDate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];

  //   return realDate;
  // };

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
    let storedData = window.localStorage.series
      ? window.localStorage.series.split(",")
      : [];

    if (!storedData.includes(data.id.toString())) {
      storedData.push(data.id);
      window.localStorage.series = storedData;
    }
  };

  const deleteItemFromLocalStorage = () => {
    const seriesArray = localStorage.getItem("series").split(",");
    const newSeriesArray = seriesArray.filter(
      (element) => element !== `${data.id}`
    );

    localStorage.setItem("series", newSeriesArray);
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
              <h1 className="title">{data.name}</h1>
              {checkStorage ? (
                <div
                  className="heart-liked"
                  onClick={() => deleteItemFromLocalStorage()}
                ></div>
              ) : (
                <div
                  className="heart-NotLiked"
                  onClick={() => addStorage()}
                ></div>
              )}
            </div>
            <div className="genre-date">
              {data.first_air_date && (
                <h4 className="date">{getData(data.first_air_date)}</h4>
              )}

              {data.genres
                ? data.genres.map((genre, index) => (
                    <li key={index}>{genreFinder(genre.id)} </li>
                  ))
                : null}
            </div>
            <h4 className="duration">
              Nombre de saisons : {data.number_of_seasons}
            </h4>
            <div className="notation-ba-providers">
              <div
                className="notation-serie"
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
              <div
                className="offers-providers"
                onClick={() => setShowPovider(true)}
              >
                <h4 className="show-providers">Voir les offres</h4>
              </div>
            </div>

            <p className="tagline">{data.tagline ? data.tagline : null}</p>
            <div className="synopsis-container">
              <h4>Synopsis</h4>
              <p className="synopsis">{data.overview}</p>
            </div>
          </div>
          {showProvider && (
            <div className="providers-container">
              <h1 className="title">{data.name}</h1>
              <div className="genre-date">
                {data.first_air_date && (
                  <h4 className="date">{getData(data.first_air_date)}</h4>
                )}

                {data.genres
                  ? data.genres.map((genre, index) => (
                      <li key={index}>{genreFinder(genre.id)} </li>
                    ))
                  : null}
              </div>
              <ProvidersSeries movieId={data.id} movieTitle={data.name} />
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
      <CreditSerie movieId={data.id} />
      <SimilarSerie movieId={data.id} />
      <Footer />
    </div>
  );
};

export default SerieInfos;
