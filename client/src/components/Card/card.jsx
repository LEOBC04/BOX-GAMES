import React from "react";
import s from "../Home/home.module.scss";
import ratingImg from "../../assets/rating.png";
import { Link } from "react-router-dom";
import { addToFavorites } from "../../Redux/slices/videogameSlice";
import { useDispatch, useSelector } from "react-redux";

const Card = ({
  image,
  name,
  genres,
  released,
  rating,
  id,
  game,
  createdInDb,
}) => {

  const dispatch = useDispatch();
  const { favVideogames } = useSelector(state => state.videogames)

  const handleFavorites = (game) => {
    dispatch(addToFavorites(game))
    let id = favVideogames.find((fav) => fav.id === game.id)
    if(id){
      alert('This video game is already in favorites')
    }else {
      alert('Video game added to favorites');
    }
  }
  return (
    <div className={s.card} key={id}>
      <img src={`${image}`} alt={name} />
      <h3>{name}</h3>

      <div className={s.genresContainer}>
        {createdInDb & (genres.length > 0)
          ? genres.map((gen) => <p>{gen.name}</p>)
          : genres.length > 0
          ? genres.map((gen) => <p>{gen}</p>)
          : null}
      </div>
      <h4>Released: {released}</h4>
      <div className={s.rating}>
        <img src={ratingImg} alt="rating" />
        <h3>{rating}</h3>
      </div>

      <div className={s.buttons}>
        <button onClick={() => handleFavorites(game)}>
          Add to favorites
        </button>
        <Link to={`/videogame/detail/${id}`}>
          <button className={s.detail}>Detail</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
