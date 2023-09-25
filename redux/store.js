import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import gameReducer from "./gameSlice";

const persistConfig = {
  key: "UrbexMetroGameData",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, gameReducer);

const store = configureStore({
  reducer: {
    game: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

const persistor = persistStore(store);

export { store, persistor };
