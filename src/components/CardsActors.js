import React from "react";

const CardsActors = ({ actor }) => {
  return (
    <div className="card-container-actors">
      <div className="img-profile">
        <img
          src={"https://image.tmdb.org/t/p/original" + actor.profile_path}
          alt=""
        />
      </div>
      <div className="infos-actors">
        <h4 className="name">{actor.name}</h4>
        <div className="know-for-container">
          <h6 className="know-for">
            {actor.known_for[0].title} {actor.known_for[0].title ? "," : null}{" "}
            {actor.known_for[1].title} ,{actor.known_for[2].title}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default CardsActors;
