import { configureStore } from "@reduxjs/toolkit";
import videogamesReducer from '../slices/videogameSlice';


const store = configureStore({
  reducer: {
    videogames: videogamesReducer,
  }
})


export default store;