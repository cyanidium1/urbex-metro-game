import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    inv: [],
    // "1", "2", "3", "4", "5", "6", "7"
    achs: [],
    showMap: false,
    frame: "p0",
    history: ["p0"],
    lang: "en",
    progress: "",
    finished: false,
    life: 2,
    ads: true,
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
    setProg: (state, action) => {
      state.progress = action.payload;
    },
    setFinish: (state, action) => {
      state.finished = action.payload;
    },
    setLife: (state, action) => {
      state.life = action.payload;
    },
    setAds: (state, action) => {
      state.ads = action.payload;
    },
  },
});

export const {
  updateInv,
  toggleShowMap,
  setFrame,
  updateHistory,
  chLang,
  setProg,
  setLife,
  setFinish,
  setAds,
} = gameSlice.actions;

export default gameSlice.reducer;
