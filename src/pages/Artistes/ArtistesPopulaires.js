import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CardsActors from "../../components/CardsActors";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const ArtistesPopulaires = () => {
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
        `https://api.themoviedb.org/3/person/popular?api_key=864b6602f4018630491e67fa714381e6&page=${pageNumber}&language=fr-FR`
      )
      .then((res) => setData(res.data.results));
  }, []);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);

    axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=864b6602f4018630491e67fa714381e6&page=${pageNumber}&language=fr-FR`
      )
      .then((res) => setData(data.concat(res.data.results)));
  };
  return (
    <div className="now-playing">
      <Navbar />
      <div className="popular-container-actors">
        <div className="cards-container-actors">
          {data
            .filter((item, index) => {
              return index === data.findIndex((item2) => item2.id === item.id);
            })
            .map((actor, index) => (
              <NavLink to={`/ActeursPopulaires/${actor.id}`}>
                <CardsActors key={index} actor={actor} />
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

export default ArtistesPopulaires;
