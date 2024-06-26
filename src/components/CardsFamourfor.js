import React from "react";

const CardsFamourfor = ({ movie }) => {
  return (
    <div className="minicards">
      <div className="img">
        <img
          src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
          alt=""
        />
      </div>

      <p>{movie.media_type === "movie" ? movie.title : movie.name}</p>
    </div>
  );
};

export default CardsFamourfor;
