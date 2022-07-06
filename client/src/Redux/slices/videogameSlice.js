import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videogames: [],
  videogamesCopy: [],
  videogamesOrderAZ: [],
  videogamesOrderZA: [],
  videogamesRatingMax: [],
  videogamesRatingMin: [],
  videogamesFilterType: [],
  videogamesFilterGenre: [],
  favVideogames: [],
  videogamesDetail: {},
};

const videogameSlice = createSlice({
  name: "videogames",
  initialState,
  reducers: {
    getVideogames(state, action) {
      state.videogames = action.payload;
      state.videogamesCopy = action.payload;
    },
    addToFavorites(state, action) {
      let id = state.favVideogames.find((fav) => fav.id === action.payload.id);
      if (!id) {
        state.favVideogames.push(action.payload);
      }
    },
    removeFromFavorites(state, action) {
      state.favVideogames = state.favVideogames.filter(
        (game) => game.id !== action.payload
      );
    },
    getDetail(state, action) {
      state.videogamesDetail = action.payload;
    },
    clearVideogameDetail(state, action) {
      state.videogamesDetail = {};
    },
    searchVideogame(state, action) {
      state.videogames = action.payload;
    },
    filterByType(state, action) {
      if(action.payload === 'existing'){
        state.videogames = state.videogamesCopy.filter(
          game => !game.createdInDb
        )
      };
      if(action.payload === 'created'){
        state.videogames = state.videogamesCopy.filter(
          game => game.createdInDb
        )
      };
      if(action.payload === 'all'){
        state.videogames = state.videogamesCopy
      };
    },
    filterByGenre(state, action) {
      // console.log(action.payload);
      state.videogames = action.payload;
    },
    orderVideogamesRequest(state, action) {
      if(action.payload.order === 'asc'){
        state.videogamesOrderAZ = action.payload.response;
      }
      if(action.payload.order === 'desc'){
        state.videogamesOrderZA = action.payload.response;
      }
      if(action.payload.order === 'max'){
        state.videogamesRatingMax = action.payload.response;
      }
      if(action.payload.order === 'min'){
        state.videogamesRatingMin = action.payload.response;
      }
    },
    orderVideogames(state, action){
      if(action.payload === 'asc'){
        state.videogames = state.videogamesOrderAZ
      }
      if(action.payload === 'desc'){
        state.videogames = state.videogamesOrderZA
      }
      if(action.payload === 'max'){
        state.videogames = state.videogamesRatingMax
      }
      if(action.payload === 'min'){
        state.videogames = state.videogamesRatingMin
      }
    },
    reloadVideogames(state, action) {
      state.videogames = state.videogamesCopy;
    },
  },
});

export const {
  getVideogames,
  addToFavorites,
  removeFromFavorites,
  getDetail,
  clearVideogameDetail,
  searchVideogame,
  filterByType,
  reloadVideogames,
  filterByGenre,
  orderVideogamesRequest,
  orderVideogames
} = videogameSlice.actions;

export default videogameSlice.reducer;
