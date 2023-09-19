// store.js
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
    // Add other reducers here as needed
  },
});

export default store;
