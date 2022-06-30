import React from "react";
import s from "../Home/home.module.scss";
import ratingImg from "../../assets/rating.png";


const Card = ({image, name, genres, released, rating, id}) => {
  return (
    
      <div className={s.card} key={id}>
        <img src={`${image}`} alt={name} />
        <h3>{name}</h3>

        <div className={s.genresContainer}>
          {genres.length > 0
            ? genres.map((gen) => <p>{gen}</p>)
            : null}
        </div>
        <h4>Released: {released}</h4>
        <div className={s.rating}>
          <img src={ratingImg} alt="rating" />
          <h3>{rating}</h3>
        </div>

        <div className={s.buttons}>
          <button>Add to favorites</button>
          <button className={s.detail}>Detail</button>
        </div>
      </div>
    
  );
};

export default Card;
