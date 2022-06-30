import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videogames: [],
  videogamesCopy: [],
  favVideogames: [],
  videogamesDetail: {},
}

const videogameSlice = createSlice({
  name: "videogames",
  initialState,
  reducers: {
    getVideogames (state, action) {
      state.videogames = action.payload;
      state.videogamesCopy = action.payload;
    }
  }
})


export const {
  getVideogames,
} = videogameSlice.actions;

export default videogameSlice.reducer