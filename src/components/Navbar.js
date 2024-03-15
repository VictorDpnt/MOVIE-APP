import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchWindow from "./SearchWindow";

const Navbar = () => {
  const [showMovie, setShowMovie] = useState(false);
  const [showSerie, setShowSerie] = useState(false);
  const [showArtiste, setShowArtiste] = useState(false);
  const [showWindowSearch, setShowWindowSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  return (
    <div
      className="nav-container"
      onMouseOver={() => setShowWindowSearch(true)}
    >
      <div className="navbar">
        <div className="nav-left">
          <NavLink to="/">
            <div className="logo"></div>
          </NavLink>

          <ul
            className="movie-drop"
            onClick={() => {
              setShowMovie(!showMovie);
              setShowArtiste(false);
              setShowSerie(false);
            }}
          >
            Films
            <div
              className={
                showMovie ? "sous-menus-movie show-movie" : "sous-menus-movie"
              }
              onMouseLeave={() => setShowMovie(false)}
            >
              <NavLink to="/Populaires">
                <li>Populaire</li>
              </NavLink>
              <NavLink to="/Avenir">
                <li>Sortie récemment</li>
              </NavLink>
              <NavLink to="/LesMieuxNotés">
                <li>Les mieux notés</li>
              </NavLink>
              <NavLink to="/DuMoment">
                <li>Du moment</li>
              </NavLink>
            </div>
          </ul>

          <ul
            className="movie-drop"
            onClick={() => {
              setShowSerie(!showSerie);
              setShowMovie(false);
              setShowArtiste(false);
            }}
          >
            Séries
            <div
              className={
                showSerie ? "sous-menus-movie show-movie" : "sous-menus-movie"
              }
              onMouseLeave={() => setShowSerie(false)}
            >
              <NavLink to="/SeriesPopulaires">
                <li>Du moment</li>
              </NavLink>
              <NavLink to="/SeriesLesMieuxNotees">
                <li>Les mieux notées</li>
              </NavLink>
            </div>
          </ul>

          <ul
            className="movie-drop"
            onClick={() => {
              setShowArtiste(!showArtiste);
              setShowMovie(false);
              setShowSerie(false);
            }}
          >
            Artistes
            <div
              className={
                showArtiste ? "sous-menus-movie show-movie" : "sous-menus-movie"
              }
              onMouseLeave={() => setShowArtiste(false)}
            >
              <NavLink to="/ArtistesPopulaires">
                <li>Populaires</li>
              </NavLink>
            </div>
          </ul>
        </div>

        <div className="nav-right">
          <input
            id="search"
            className="input open"
            type="text"
            onChange={(e) => {
              setShowWindowSearch(true);
              setInputSearch(e.target.value);
            }}
            placeholder="Films, Séries ou Artistes ..."
          />
          <label htmlFor="search">
            <div
              className="loupe"
              onClick={() => setShowWindowSearch(!showWindowSearch)}
            ></div>
          </label>
        </div>
      </div>
      {showWindowSearch && (
        <div
          className="search-window"
          onMouseLeave={() => {
            setShowWindowSearch(false);
          }}
        >
          <SearchWindow inputSearch={inputSearch} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
