import React from "react";
import s from "./home.module.scss";
import Footer from "./footer";
import Aside from "./aside";

const Home = () => {
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
        <section className={s.cardsContainer}></section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
