import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { NavLink } from "react-router-dom";
import CardsSeries from "../../components/CardsSeries";
import InfiniteScroll from "react-infinite-scroll-component";
const SeriesLesMieuxNotees = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=864b6602f4018630491e67fa714381e6&page=${pageNumber}&language=fr-FR`
      )
      .then((res) => setData(res.data.results));
  }, []);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);

    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=864b6602f4018630491e67fa714381e6&page=${pageNumber}&language=fr-FR`
      )
      .then((res) => setData(data.concat(res.data.results)));
  };
  return (
    <div className="avenir">
      <Navbar />
      <div className="popular-container pop">
        <h2 className="title-page">Séries les mieux notées</h2>
        <div className="cards-container">
          {data
            .filter((item, index) => {
              return index === data.findIndex((item2) => item2.id === item.id);
            })
            .map((movie) => (
              <NavLink to={`/SeriesPopulaires/${movie.id}`}>
                <CardsSeries key={movie.id} movie={movie} />
              </NavLink>
            ))}
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={true}
            loader={<h4>Scroll...</h4>}
          ></InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default SeriesLesMieuxNotees;
