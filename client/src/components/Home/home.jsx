import s from "./home.module.scss";
import Footer from "./footer";
import Aside from "./aside";
import Card from "../Card/card";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideogames } from "../../Redux/thunks/videogameThunks.js";

const Home = () => {
  const dispatch = useDispatch();
  const { videogames } = useSelector((state) => state.videogames);

  useEffect(() => {
    if(videogames.length === 0) {
    dispatch(fetchAllVideogames());
    }
  }, [dispatch, videogames]);

  return (
    <div>
      <header className={s.header}>
        <div className={s.header__container}>
          <h2>Find video games</h2>
          <form action="#">
            <input type="text" placeholder="Type a name..." />
            <input type="submit" value="Search" />
          </form>
        </div>
      </header>

      <main className={s.contenedorPrincipal}>
        <Aside />
        <section className={s.cardsContainer}>
          {videogames.map((game) => (
            <Card
              id={game.id}
              image={game.image}
              name={game.name}
              genres={game.genres}
              released={game.released}
              rating={game.rating}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
