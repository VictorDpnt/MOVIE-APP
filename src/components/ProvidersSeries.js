import axios from "axios";
import React, { useEffect, useState } from "react";

const ProvidersSeries = ({ movieTitle, movieId }) => {
  const [data, setData] = useState([]);
  const [countryChoice, setCountryChoice] = useState("FR");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${
          movieId && movieId
        }/watch/providers?api_key=864b6602f4018630491e67fa714381e6&language=fr-FR`
      )
      .then((res) => setData(res.data.results[countryChoice]));
  }, [countryChoice, movieId]);

  const handleChange = (event) => {
    setCountryChoice(event.target.value);
  };

  return (
    <div className="providers-containt">
      {data ? (
        <div className="provider">
          {data.free && <h3 className="type">En visionnage gratuit</h3>}
          {data.free &&
            data.free.map((provider, index) => (
              <img
                src={"https://image.tmdb.org/t/p/original" + provider.logo_path}
                alt=""
                key={index}
              />
            ))}
        </div>
      ) : null}

      {data ? (
        <div className="provider">
          {data.flatrate && (
            <h3 className="type">En streaming avec abonnement</h3>
          )}
          {data.flatrate &&
            data.flatrate.map((provider, index) => (
              <img
                src={"https://image.tmdb.org/t/p/original" + provider.logo_path}
                alt=""
                key={index}
              />
            ))}
        </div>
      ) : null}

      {data ? (
        <div className="provider">
          {data.buy && <h3 className="type">À l'achat</h3>}
          {data.buy &&
            data.buy.map((provider, index) => (
              <img
                src={"https://image.tmdb.org/t/p/original" + provider.logo_path}
                alt=""
                key={index}
              />
            ))}
        </div>
      ) : null}

      <select
        className="select-country"
        value={countryChoice}
        onChange={handleChange}
      >
        <option value="FR"> France </option>
        <option value="US" onChange={() => setCountryChoice("US")}>
          États-Unis
        </option>
        <option value="GB"> Royaume-Uni </option>
        <option value="BE"> Belgique </option>
        <option value="ES"> Espagne </option>
        <option value="IT"> Italie </option>
        <option value="AU"> Australie </option>
        <option value="PT"> Portugal </option>
      </select>

      {!data && <h4>Il n'y a actuellement aucune offre pour {movieTitle}. </h4>}
    </div>
  );
};

export default ProvidersSeries;
