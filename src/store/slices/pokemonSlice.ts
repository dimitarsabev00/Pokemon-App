import { createSlice } from "@reduxjs/toolkit";
import {
  PokemonSliceInitialState,
  generatedPokemonType,
} from "../../utils/types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonsData } from "../reducers/getPokemonsData";
import { getUserPokemons } from "../reducers/getUserPokemons";
import { removePokemonFromUserList } from "../reducers/removePokemonFromUserList";

const initialState: PokemonSliceInitialState = {
  allPokemons: undefined,
  randomPokemons: undefined,
  compareQueue: [],
  userPokemons: [],
};

export const pokemonSlice = createSlice({
  name: "pokemonSlice",
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      if (index === -1) {
        if (state.compareQueue.length === 2) {
          state.compareQueue.pop();
        }
        state.compareQueue.unshift(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      const index = state.compareQueue.findIndex(
        (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
      );
      const queue = [...state.compareQueue];
      queue.splice(index, 1);
      state.compareQueue = queue;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
      state.allPokemons = action.payload;
    });
    builder.addCase(getPokemonsData.fulfilled, (state, action) => {
      state.randomPokemons = action.payload;
    });
    builder.addCase(getUserPokemons.fulfilled, (state, action) => {
      state.userPokemons = action.payload!;
    });
    builder.addCase(removePokemonFromUserList.fulfilled, (state, action) => {
      const userPokemons = [...state.userPokemons];
      const index = userPokemons.findIndex(
        (pokemon) => pokemon.firebaseId === action.payload?.id
      );
      userPokemons.splice(index, 1);
      state.userPokemons = userPokemons;
    });
  },
});

export const { addToCompare, removeFromCompare } = pokemonSlice.actions;
export default pokemonSlice.reducer;
