import { createSlice } from "@reduxjs/toolkit";
import { PokemonSliceInitialState } from "../../utils/types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";

const initialState: PokemonSliceInitialState = {
  allPokemons: null,
};

export const pokemonSlice = createSlice({
  name: "pokemonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemons = action.payload;
    });
  },
});

export default pokemonSlice.reducer;
