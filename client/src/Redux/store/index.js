import { configureStore } from "@reduxjs/toolkit";
import videogamesReducer from '../slices/videogameSlice';
import genreReducer from '../slices/genreSlice';
import platformReducer from '../slices/platformSlice';


const store = configureStore({
  reducer: {
    videogames: videogamesReducer,
    genres: genreReducer,
    platforms: platformReducer
  }
})


export default store;