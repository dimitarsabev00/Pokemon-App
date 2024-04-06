import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeneralSliceInitialState } from "../../utils/types";

const initialState: GeneralSliceInitialState = {
  isLoading: true,
  toasts: [],
  userInfo: undefined,
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
  },
});

export const { setLoading, setToast, clearToasts, setUserStatus } =
  generalSlice.actions;

export default generalSlice.reducer;
