import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videogames: [],
}

const videogameSlice = createSlice({
  name: "videogames",
  initialState,
  reducers: {

  }
})


export default videogameSlice.reducer