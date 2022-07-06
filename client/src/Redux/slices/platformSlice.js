import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platforms: [],
}

const platformSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    getPlatforms(state, action) {
      state.platforms = action.payload;
    }
  }
})

export const { getPlatforms } = platformSlice.actions;

export default platformSlice.reducer;