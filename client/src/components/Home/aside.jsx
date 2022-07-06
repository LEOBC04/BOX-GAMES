import React, { useRef, useEffect } from "react";
import s from "./home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGenres } from "../../Redux/thunks/genreThunks";
import {
  reloadVideogames,
  filterByType,
  orderVideogames,
} from "../../Redux/slices/videogameSlice";

import {
  fetchVideogamesByGenre,
  fetchVideogamesByOrder,
} from "../../Redux/thunks/filterThunks";

const Aside = () => {
  const originRef = useRef();
  const genreRef = useRef();
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state.genres);
  const { videogamesOrderAZ } = useSelector((state) => state.videogames);

  const handleOrder = (e) => {
    if (e.target.name === "asc") {
      dispatch(orderVideogames(e.target.name));
    } else {
      dispatch(fetchVideogamesByOrder(e.target.name));
    }
    if (e.target.name === "desc") {
      dispatch(orderVideogames(e.target.name));
    } else {
      dispatch(fetchVideogamesByOrder(e.target.name));
    }
    if (e.target.name === "max") {
      dispatch(orderVideogames(e.target.name));
    } else {
      dispatch(fetchVideogamesByOrder(e.target.name));
    }
    if (e.target.name === "min") {
      dispatch(orderVideogames(e.target.name));
    } else {
      dispatch(fetchVideogamesByOrder(e.target.name));
    }
  };

  const handleGenreSelect = (e) => {
    dispatch(fetchVideogamesByGenre(e.target.value));
  };

  const handleTypeSelect = (e) => {
    dispatch(filterByType(e.target.value));
  };

  const handleFilterReset = () => {
    dispatch(reloadVideogames());
    originRef.current.value = "all";
    genreRef.current.value = "all";
  };

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchAllGenres());
    }
    if (!videogamesOrderAZ.length) {
      dispatch(fetchVideogamesByOrder("asc"));
      dispatch(fetchVideogamesByOrder("desc"));
      dispatch(fetchVideogamesByOrder("max"));
      dispatch(fetchVideogamesByOrder("min"));
    }
  }, [dispatch, genres, videogamesOrderAZ]);

  return (
    <div>
      <aside>
        <nav className={s.orders}>
          <h3>Order by:</h3>
          <ul>
            <li>
              <button name="asc" onClick={handleOrder}>
                (A-Z)
              </button>
            </li>
            <li>
              <button name="desc" onClick={handleOrder}>
                (Z-A)
              </button>
            </li>
            <li>
              <button name="max" onClick={handleOrder}>
                Rating (max-min)
              </button>
            </li>
            <li>
              <button name="min" onClick={handleOrder}>
                Rating (min-max)
              </button>
            </li>
            <li>
              <button onClick={() => dispatch(reloadVideogames())}>
                Reset
              </button>
            </li>
          </ul>
        </nav>

        <nav className={s.filters}>
          <h3>Filter by:</h3>
          <select
            className={s.genre}
            onChange={handleGenreSelect}
            name="genre"
            ref={genreRef}
          >
            <option value="all">All</option>
            {genres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>

          <select
            className={s.type}
            onChange={handleTypeSelect}
            name="origin"
            ref={originRef}
          >
            <option value="all">All</option>
            <option value="existing">Existing</option>
            <option value="created">Created</option>
          </select>
          <button onClick={handleFilterReset}>Reset</button>
          <button
            className={s.reload}
            onClick={() => dispatch(reloadVideogames())}
          >
            Reload all video games
          </button>
        </nav>
      </aside>
    </div>
  );
};

export default Aside;
