import { createSlice } from "@reduxjs/toolkit";
import { PokemonSliceInitialState } from "../../utils/types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonsData } from "../reducers/getPokemonsData";

const initialState: PokemonSliceInitialState = {
  allPokemons: undefined,
  randomPokemons: undefined,
};

export const pokemonSlice = createSlice({
  name: "pokemonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemons = action.payload;
    });
    builder.addCase(getPokemonsData.fulfilled, (state, action) => {
      state.randomPokemons = action.payload;
    });
  },
});

export default pokemonSlice.reducer;
