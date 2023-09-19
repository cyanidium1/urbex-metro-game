import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    inv: ["0"],
    showMap: false,
    frame: "pb11311",
    history: ["p0"],
    lang: "en",
  },
  reducers: {
    updateInv: (state, action) => {
      state.inv = action.payload;
    },
    toggleShowMap: (state) => {
      state.showMap = !state.showMap;
    },
    setFrame: (state, action) => {
      state.frame = action.payload;
    },
    updateHistory: (state, action) => {
      state.history = action.payload;
    },
    chLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { updateInv, toggleShowMap, setFrame, updateHistory, chLang } =
  gameSlice.actions;

export default gameSlice.reducer;
