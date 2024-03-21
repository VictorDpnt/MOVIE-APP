import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SearchWindow from "./SearchWindow";

const Navbar = () => {
  const [showMovie, setShowMovie] = useState(false);
  const [showSerie, setShowSerie] = useState(false);
  const [showArtiste, setShowArtiste] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const [showWindowSearch, setShowWindowSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  return (
    <div id="nav" className="nav-container active">
      <div className="navbar">
        <div className="nav-left">
          <img
            src="./img/menu-burger.png"
            alt=""
            className="burger-menu"
            onClick={() => setShowBurger(!showBurger)}
          />
          <NavLink to="/">
            <div className="logo"></div>
          </NavLink>

          <ul
            className="movie-drop"
            onClick={() => {
              setShowMovie(!showMovie);
              setShowArtiste(false);
              setShowSerie(false);
              setShowFav(false);
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
                <li>Tous les films</li>
              </NavLink>
              <NavLink to="/Avenir">
                <li>Populaires</li>
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
              setShowFav(false);
            }}
          >
            Séries
            <div
              className={
                showSerie ? "sous-menus-movie show-movie" : "sous-menus-movie"
              }
              onMouseLeave={() => setShowSerie(false)}
            >
              <NavLink to="/AllSeries">
                <li>Toutes les séries</li>
              </NavLink>
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
              setShowFav(false);
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

          <ul
            className="movie-drop"
            onClick={() => {
              setShowFav(!showFav);
              setShowArtiste(false);
              setShowMovie(false);
              setShowSerie(false);
            }}
          >
            Mes favoris
            <div
              className={
                showFav ? "sous-menus-movie show-movie" : "sous-menus-movie"
              }
              onMouseLeave={() => setShowFav(false)}
            >
              <NavLink to="/MaListe">
                <li>Films</li>
              </NavLink>
              <NavLink to="/MaListeSeries">
                <li>Séries</li>
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

      <div className={showBurger ? "menu-burger active" : "menu-burger"}>
        <ul
          className="movie-drop"
          onClick={() => {
            setShowMovie(!showMovie);
            setShowArtiste(false);
            setShowSerie(false);
            setShowFav(false);
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
              <li>Tous les films</li>
            </NavLink>
            <NavLink to="/Avenir">
              <li>Populaires</li>
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
            setShowFav(false);
          }}
        >
          Séries
          <div
            className={
              showSerie ? "sous-menus-movie show-movie" : "sous-menus-movie"
            }
            onMouseLeave={() => setShowSerie(false)}
          >
            <NavLink to="/AllSeries">
              <li>Toutes les séries</li>
            </NavLink>
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
            setShowFav(false);
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

        <ul
          className="movie-drop"
          onClick={() => {
            setShowFav(!showFav);
            setShowArtiste(false);
            setShowMovie(false);
            setShowSerie(false);
          }}
        >
          Mes favoris
          <div
            className={
              showFav ? "sous-menus-movie show-movie" : "sous-menus-movie"
            }
            onMouseLeave={() => setShowFav(false)}
          >
            <NavLink to="/MaListe">
              <li>Films</li>
            </NavLink>
            <NavLink to="/MaListeSeries">
              <li>Séries</li>
            </NavLink>
          </div>
        </ul>
      </div>

      {showWindowSearch && (
        <div
          className="search-window"
          onMouseLeave={() => {
            setShowWindowSearch(false);
          }}
          onClick={() => setShowWindowSearch(false)}
        >
          <SearchWindow inputSearch={inputSearch} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
