import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeneralSliceInitialState } from "../../utils/types";

const initialState: GeneralSliceInitialState = {
  isLoading: true,
  toasts: [],
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
  },
});

export const { setLoading,setToast,clearToasts } = generalSlice.actions;

export default generalSlice.reducer;
