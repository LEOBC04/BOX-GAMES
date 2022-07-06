import React from "react";
import s from "./landingPage.module.scss";
import icon from "../../assets/icon.PNG";
import sonic from "../../assets/bgLanding.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={s.container}>
      <div className={s.sonic}>
        <img src={sonic} alt="sonic" />
      </div>

      <div className={s.logoContainer}>
        <div className={s.logoContainer__imageContainer}>
          <img src={icon} alt="perro" className={s.logoContainer__image} />
        </div>
        <span className={s.logoContainer__text}>BOX-GAMES</span>
      </div>

      <header className={s.header}>
        <h1 className={s.header__title}>
          Here you can discover hundreds of video games.
        </h1>
        <Link to="/home" className={s.header__button}>
          Home
        </Link>
      </header>
    </div>
  );
};

export default LandingPage;
