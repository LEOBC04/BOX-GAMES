import React from "react";
import s from "./navBar.module.scss";
import icon from "../../assets/favicon.ico";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStar, faGamepad, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <div>
      <section>
        <Outlet />
      </section>
      <nav className={s.nav}>
        <ul>
          <li>
            <Link to={"/home"}>
              <div className={s.favicon}>
                <img src={icon} alt="icon" />
              </div>
              <div className={`${s.texto} ${s.textoFav}`}>BOX-GAMES</div>
            </Link>
          </li>
          <li>
            <Link to={"/home"}>
              <div className={s.icon}>
                <FontAwesomeIcon icon={faHouse}/>
              </div>
              <div className={s.texto}>Home</div>
            </Link>
          </li>
          <li>
            <Link to={"/favorites"}>
              <div className={s.icon}>
              <FontAwesomeIcon icon={faStar} />
              </div>
              <div className={s.texto}>Favorites</div>
            </Link>
          </li>
          <li>
            <Link to={"/createVideogame"}>
              <div className={s.icon}>
              <FontAwesomeIcon icon={faGamepad} />
              </div>
              <div className={s.texto}>Create-Videogames</div>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <div className={s.icon}>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
              <div className={s.texto}>LogOut</div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
