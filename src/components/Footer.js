import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="left-part">
        <NavLink to="/">
          <a href="#nav">
            <div className="img"></div>
          </a>
        </NavLink>
      </div>
      <div className="middle-part">
        <div className="menu-footer">
          <NavLink to="/Populaires">
            <p>Films </p>
          </NavLink>
          <p className="separate">|</p>
          <NavLink to="/AllSeries">
            <p>Séries </p>
          </NavLink>
          <p className="separate">|</p>
          <NavLink to="/ArtistesPopulaires">
            <p>Artistes </p>
          </NavLink>
        </div>
        <p className="copyright">Copyright © 2024 MEDIAMOVIE</p>
      </div>
      <div className="right-part">
        <a href="https://github.com/VictorDpnt">
          {" "}
          <i className="fab fa-github github-logo"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
