import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Cards from "../../components/Cards";
import { NavLink } from "react-router-dom";
import Trie from "../../components/Trie";
import InfiniteScroll from "react-infinite-scroll-component";

const Artistes = () => {
  const [data, setData] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [sortChoice, setChoiceSort] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=864b6602f4018630491e67fa714381e6&page=${pageNumber}&language=fr-FR`
      )
      .then((res) => setData(res.data.results));
  }, []);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);

    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=864b6602f4018630491e67fa714381e6&page=${pageNumber}&language=fr-FR`
      )
      .then((res) => setData(data.concat(res.data.results)));
  };
  return (
    <div className="now-playing">
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
                    <li onClick={() => setChoiceSort(2)}>Popularité +/-</li>
                    <li onClick={() => setChoiceSort(3)}>Popularité -/+</li>
                  </div>
                ) : null}
              </ul>
            </div>
            <div className="drop-container">
              <ul onClick={() => setShowRate(!showRate)}>
                Notation
                {showRate ? (
                  <div className="drop-menu">
                    <li onClick={() => setChoiceSort(0)}>Note +/-</li>
                    <li onClick={() => setChoiceSort(1)}>Note -/+</li>
                  </div>
                ) : null}
              </ul>
            </div>
            <div className="drop-container">
              <ul onClick={() => setShowDate(!showDate)}>
                Dates de sortie
                {showDate ? (
                  <div className="drop-menu">
                    <li onClick={() => setChoiceSort(4)}>Date +/-</li>
                    <li onClick={() => setChoiceSort(5)}>Date -/+</li>
                  </div>
                ) : null}
              </ul>
            </div>
            <p onClick={() => setChoiceSort(6)}>Titres ( de A à Z)</p>
          </div>
        </div>
        <div className="cards-container">
          {data
            .sort((a, b) => {
              if (sortChoice === 0) {
                return b.vote_average - a.vote_average;
              } else if (sortChoice === 1) {
                return a.vote_average - b.vote_average;
              } else if (sortChoice === 2) {
                return b.popularity - a.popularity;
              } else if (sortChoice === 3) {
                return a.popularity - b.popularity;
              } else if (sortChoice === 4) {
                let d1 = new Date(a.release_date);
                let d2 = new Date(b.release_date);
                if (d1 < d2) {
                  return 1;
                } else if (d1 > d2) {
                  return -1;
                }
              } else if (sortChoice === 5) {
                let d1 = new Date(a.release_date);
                let d2 = new Date(b.release_date);
                if (d1 > d2) {
                  return 1;
                } else if (d1 < d2) {
                  return -1;
                }
              } else if (sortChoice === 6) {
                return a.title.localeCompare(b.title);
              }
            })
            // .sort((a, b) => b.popularity - a.popularity)
            .filter((item, index) => {
              return index === data.findIndex((item2) => item2.id === item.id);
            })
            .map((movie, index) => (
              <NavLink to={`/${movie.id}`}>
                <Cards key={index} movie={movie} />
              </NavLink>
            ))}
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
    </div>
  );
};

export default Artistes;
