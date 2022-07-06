import React from "react";
import ratingImg from "../../assets/rating.png";
import s from "./favorites.module.scss";
import Footer from "../Home/footer";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../../Redux/slices/videogameSlice";
import { useSelector, useDispatch } from "react-redux";

const Favorites = () => {
  const { favVideogames } = useSelector((state) => state.videogames);
  const dispatch = useDispatch();

  return (
    <div>
      {favVideogames.length > 0 ? (
      <section className={s.contenedorPrincipal}>
        <h2>Your favorites:</h2>

          <div className={s.cardsContainer}>
        {favVideogames.map((game) => (
            <div className={s.card} key={game.id}>
              <img src={`${game.image}`} alt={game.name} />
              <h3>{game.name}</h3>

              <div className={s.genresContainer}>
               { game.createdInDb 
               ? game.genres.map((gen) => <p>{gen.name}</p>)
               : game.genres.map((gen) => <p>{gen}</p>)}
              </div>
              <h4>Released: {game.released}</h4>
              <div className={s.rating}>
                <img src={ratingImg} alt="rating" />
                <h3>{game.rating}</h3>
              </div>

              <div className={s.buttons}>
                <button onClick={() => dispatch(removeFromFavorites(game.id))}>
                  Remove from favorites
                </button>
                <Link to={`/videogame/detail/${game.id}`}>
                <button className={s.detail}>Detail</button>
                </Link>
              </div>
            </div>
        ))}
          </div>
      </section>
      ) : (
        <div className={s.message}>
        <h2>You don´t have any favorite</h2>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Favorites;
