import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeneralSliceInitialState } from "../../utils/types";

const initialState: GeneralSliceInitialState = {
  isLoading: true,
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = generalSlice.actions;

export default generalSlice.reducer;
