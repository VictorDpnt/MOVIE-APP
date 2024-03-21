import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CardsSeries from "../../components/CardsSeries";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import Footer from "../../components/Footer";

const AllSeries = () => {
  const [data, setData] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [popSort, setPopSort] = useState("&with_genres=10765");
  const dataGenreArray = [
    {
      id: 10759,
      name: "Action & Adventure",
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
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystère",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Science-Fiction & Fantastique",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR&page=${pageNumber}${popSort}`
      )
      .then((res) => setData(res.data.results));
  }, [popSort]);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);

    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR&page=${pageNumber}${popSort}`
      )
      .then((res) => setData(data.concat(res.data.results)));
  };
  return (
    <div>
      <Navbar />
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
                        setPopSort("&sort_by=first_air_date.desc");
                      }}
                    >
                      Date +/-
                    </li>
                    <li
                      onClick={() => {
                        setPageNumber(1);
                        setPopSort("&sort_by=first_air_date.asc");
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
                setPopSort("&sort_by=name.asc");
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
                <NavLink to={`/SeriesPopulaires/${movie.id}`}>
                  <CardsSeries key={movie.id} movie={movie} />
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

export default AllSeries;
