import React from "react";
import s from "./favorites.module.scss";
import Footer from "../Home/footer";

const Favorites = () => {
  return (
    <div>
      <section className={s.cardsContainer}>
        <h2>Your favorites:</h2>
      </section>

      <Footer />
    </div>
  );
};

export default Favorites;
