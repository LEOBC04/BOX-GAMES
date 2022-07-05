import s from "./home.module.scss";
import Footer from "./footer";
import Aside from "./aside";
import Card from "../Card/card";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllGenres } from "../../Redux/thunks/genreThunks";
import {
  fetchAllVideogames,
  fetchVideogameByName,
} from "../../Redux/thunks/videogameThunks.js";

const Home = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { videogames } = useSelector((state) => state.videogames);
  const initialState = {
    name: "",
  };

  const [input, setInput] = useState(initialState);

  const handleInputChange = (e) => {
    setInput({
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchVideogameByName(input.name));
    // dispatch(fetchAllGenres());
    inputRef.current.value = '';
  }

  useEffect(() => {
    if (videogames.length === 0) {
      dispatch(fetchAllVideogames());
    }
  }, [dispatch, videogames]);

  return (
    <div>
      <header className={s.header}>
        <div className={s.header__container}>
          <h2>Find video games</h2>
          <form onSubmit={handleOnSubmit}>
            <input
              type="search"
              placeholder="Type a name..."
              onChange={handleInputChange}
              name="name"
              ref={inputRef}
            />
            <input type="submit" value="Search" />
          </form>
        </div>
      </header>

      <main className={s.contenedorPrincipal}>
        <Aside />
        {videogames.length > 0 ? (
          <section className={s.cardsContainer}>
            {videogames.map((game) => (
              <Card
                id={game.id}
                image={game.image}
                name={game.name}
                genres={game.genres}
                released={game.released}
                rating={game.rating}
                game={game}
                createdInDb={game.createdInDb}
              />
            ))}
          </section>
        ) : (
          <div className={s.loaderContainer}>
            <span className={s.loader}></span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
