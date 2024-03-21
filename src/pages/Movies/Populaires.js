import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Cards from "../../components/Cards";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "../../components/Footer";
import Caroussel from "../../components/Caroussel";

const Acceuil = () => {
  const [data, setData] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [popSort, setPopSort] = useState("&sort_by=popularity.desc");
  const dataGenreArray = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Aventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comédie",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentaire",
    },
    {
      id: 18,
      name: "Drame",
    },
    {
      id: 10751,
      name: "Familial",
    },
    {
      id: 14,
      name: "Fantastique",
    },
    {
      id: 36,
      name: "Histoire",
    },
    {
      id: 27,
      name: "Horreur",
    },
    {
      id: 10402,
      name: "Musique",
    },
    {
      id: 9648,
      name: "Mystère",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science-Fiction",
    },
    {
      id: 10770,
      name: "Téléfilm",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "Guerre",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=864b6602f4018630491e67fa714381e6&include_adult=false&include_video=false&language=fr-FR&page=${pageNumber}${popSort}`
      )
      .then((res) => setData(res.data.results));
  }, [popSort]);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=864b6602f4018630491e67fa714381e6&include_adult=false&include_video=false&language=fr-FR&page=${pageNumber}${popSort}`
      )
      .then((res) => setData(data.concat(res.data.results)));
  };

  const handleIdchange = (newId) => {
    setPopSort("&with_genres=" + newId);
  };

  return (
    <div>
      <Navbar />
      {/* <Caroussel /> */}
      <div className="popular-container">
        <div className="filters">
          <h3>Trier les résultats par</h3>
          <div className="trie-container">
            <div className="drop-container">
              <ul onClick={() => setShowPop(!showPop)}>
                Popularité
                {showPop ? (
                  <div className="drop-menu">
                    <li
                      onClick={() => {
                        setPopSort("&sort_by=popularity.desc");
                        setPageNumber(1);
                      }}
                    >
                      Popularité +/-
                    </li>
                    <li
                      onClick={() => {
                        setPageNumber(1);
                        setPopSort("&sort_by=popularity.asc");
                      }}
                    >
                      Popularité -/+
                    </li>
                  </div>
                ) : null}
              </ul>
            </div>
            <div className="drop-container">
              <ul onClick={() => setShowRate(!showRate)}>
                Notation
                {showRate ? (
                  <div className="drop-menu">
                    <li
                      onClick={() => {
                        setPageNumber(1);
                        setPopSort("&vote_average.gte=8.5");
                      }}
                    >
                      Note +/-
                    </li>
                    <li
                      onClick={() => {
                        setPageNumber(1);
                        setPopSort("&sort_by=vote_average.asc");
                      }}
                    >
                      Note -/+
                    </li>
                  </div>
                ) : null}
              </ul>
            </div>
            <div className="drop-container">
              <ul onClick={() => setShowDate(!showDate)}>
                Dates de sortie
                {showDate ? (
                  <div className="drop-menu">
                    <li
                      onClick={() => {
                        setPageNumber(1);
                        setPopSort("&sort_by=primary_release_date.desc");
                      }}
                    >
                      Date +/-
                    </li>
                    <li
                      onClick={() => {
                        setPageNumber(1);
                        setPopSort("&sort_by=primary_release_date.asc");
                      }}
                    >
                      Date -/+
                    </li>
                  </div>
                ) : null}
              </ul>
            </div>
            <p
              onClick={() => {
                setPageNumber(1);
                setPopSort("&sort_by=title.asc");
              }}
            >
              Titres ( de A à Z)
            </p>
          </div>
          <div className="sort-by-genre">
            <h2>Genre</h2>
            <div className="items-container">
              {dataGenreArray.map((genre) => (
                <div className="items">
                  <button
                    onClick={() => {
                      setPopSort("&with_genres=" + genre.id);
                      setPageNumber(1);
                    }}
                  >
                    {genre.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cards-container">
          {data
            .filter((item, index) => {
              return index === data.findIndex((item2) => item2.id === item.id);
            })
            .map((movie) => {
              return (
                <NavLink to={`/${movie.id}`}>
                  <Cards key={movie.id} movie={movie} />
                </NavLink>
              );
            })}
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={showMore}
            loader={<h4>Loading...</h4>}
          ></InfiniteScroll>
        </div>
        <div className="null"></div>
        <h1
          className="show-more"
          onClick={() => {
            setShowMore(true);
            fetchData();
          }}
        >
          Afficher d'avantage ...
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default Acceuil;
