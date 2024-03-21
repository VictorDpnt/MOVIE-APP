import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { NavLink } from "react-router-dom";

const images = [
  {
    src: "./img/interstelar.jpeg",
    text: "Première image",
  },
  {
    src: "./img/avatarbg.jpeg",
    text: "Deuxième image",
  },
  {
    src: "./img/dune.jpeg",
    text: "Troisième image",
  },
  {
    src: "./img/onepiece.jpeg",
    text: "Troisième image",
  },
  {
    src: "./img/onepiece.jpeg",
    text: "Troisième image",
  },
  {
    src: "./img/onepiece.jpeg",
    text: "Troisième image",
  },
  {
    src: "./img/onepiece.jpeg",
    text: "Troisième image",
  },
  {
    src: "./img/onepiece.jpeg",
    text: "Troisième image",
  },
  {
    src: "./img/onepiece.jpeg",
    text: "Troisième image",
  },
  {
    src: "./img/onepiece.jpeg",
    text: "Troisième image",
  },
];

const GenreMovieacc = ({ genre }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=864b6602f4018630491e67fa714381e6&include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_genres=${genre}`
      )
      .then((res) => setData(res.data.results));
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

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
        genre = "Science-Fiction";
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

  return (
    <div className="carousel-genre">
      <div className="carousel-container2">
        <AnimatePresence>
          {data
            .filter((movie) => {
              if (
                movie.original_language === "en" ||
                movie.original_language === "fr" ||
                movie.original_language === "jp" ||
                movie.original_language === "ko"
              ) {
                return movie;
              } else {
                return null;
              }
            })
            .map(
              (movie, index) =>
                index === currentSlide && (
                  <NavLink to={`/${movie.id}`}>
                    <motion.div
                      key={index}
                      className="slide"
                      initial={{ opacity: 0, x: "100%" }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: "-100%" }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={
                          "https://image.tmdb.org/t/p/original" +
                          movie.backdrop_path
                        }
                        alt={movie.title}
                      />
                      <div className="infos-carousel">
                        <div className="title-genre">
                          <h1 className="title">{movie.title}</h1>
                          <div className="genre-container">
                            {movie.genre_ids.map((genre) => (
                              <p className="genre">{genreFinder(genre)}</p>
                            ))}
                          </div>
                        </div>

                        <NavLink to={`/${movie.id}`}>
                          <h3 className="more-infos">
                            <i className="fa-solid fa-circle-info"></i>
                          </h3>
                        </NavLink>
                      </div>
                    </motion.div>
                  </NavLink>
                )
            )}
        </AnimatePresence>
        <div className="indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={
                index === currentSlide ? "indicator active" : "indicator"
              }
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
        <button className="prev" onClick={handlePrev}>
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <button className="next" onClick={handleNext}>
          <i className="fa-solid fa-angle-right"></i>
        </button>
        <div className="gradient-overlay"></div>
      </div>
    </div>
  );
};

export default GenreMovieacc;
