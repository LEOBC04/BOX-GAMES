import { configureStore } from "@reduxjs/toolkit";
import videogamesReducer from '../slices/videogameSlice';
import genreReducer from '../slices/genreSlice';


const store = configureStore({
  reducer: {
    videogames: videogamesReducer,
    genres: genreReducer
  }
})


export default store;