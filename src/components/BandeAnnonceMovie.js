import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BandeAnnonceMovie = ({ movieId }) => {
  const [data, setData] = useState([]);
  const idMovie = movieId;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          idMovie ? idMovie : 969492
        }/videos?api_key=864b6602f4018630491e67fa714381e6&query`
      )
      .then((res) => setData(res.data.results[1]));
  }, [data, idMovie]);
  return (
    <div>
      {data.key && (
        <Link
          to={`https://www.youtube.com/watch?v=${data.key}`}
          target="_blank"
        >
          <div className="bandeAnnonce-movie">
            <p>Bande-annonce</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default BandeAnnonceMovie;
