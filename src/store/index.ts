import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/generalSlice";
export * from "./slices/generalSlice";
import pokemonSlice from "./slices/pokemonSlice";
export * from "./slices/pokemonSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    generalSlice,
    pokemonSlice,
  },
});

export default store;
