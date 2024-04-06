import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeneralSliceInitialState } from "../../utils/types";
import { pokemonTabs } from "../../utils/constants";

const initialState: GeneralSliceInitialState = {
  isLoading: true,
  toasts: [],
  userInfo: undefined,
  currentPokemonTab: pokemonTabs.description,
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToast: (state, action: PayloadAction<string>) => {
      const toasts = [...state.toasts];
      toasts.push(action.payload);
      state.toasts = toasts;
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    setUserStatus: (
      state,
      action: PayloadAction<{ email: string } | undefined>
    ) => {
      state.userInfo = action.payload;
    },
    setPokemonTab: (state, action) => {
      state.currentPokemonTab = action.payload;
    },
  },
});

export const {
  setLoading,
  setToast,
  clearToasts,
  setUserStatus,
  setPokemonTab,
} = generalSlice.actions;

export default generalSlice.reducer;
