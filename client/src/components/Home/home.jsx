import s from "./home.module.scss";
import Footer from "./footer";
import Pagination from "../Pagination/pagination";
import Aside from "./aside";
import Card from "../Card/card";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllVideogames,
  fetchVideogameByName,
} from "../../Redux/thunks/videogameThunks.js";

const Home = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { videogames } = useSelector((state) => state.videogames);
  const [currentPage, setcurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const lastIndex = currentPage * gamesPerPage;
  const firstIndex = lastIndex - gamesPerPage;
  const currentGames = videogames.slice(firstIndex, lastIndex );

  if(currentPage > Math.ceil(videogames.length/ gamesPerPage) && currentPage !== 1) {
    setcurrentPage(1);
  }

  const changePage = (pageNumber) => {
    setcurrentPage(pageNumber);
  }
  
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
        {currentGames.length > 0 ? (
          <div className={s.cardPageContainer}>
          <section className={s.cardsContainer}>
            {currentGames.map((game) => (
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
          
            <div className={s.pagesContainer}>
              <Pagination
                gamesPerPage={gamesPerPage}
                videogames={videogames}
                changePage={changePage}
                currentPage={currentPage}
              />
            </div>
          </div>
          

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
