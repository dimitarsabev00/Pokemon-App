import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { generatedPokemonType, genericPokemonType } from "../../utils/types";
import { pokemonTypes } from "../../utils/pokemonTypes";
import { defaultImages, images } from "../../utils/pokemonImages";

export const getPokemonsData = createAsyncThunk(
  "pokemon/randomPokemon",
  async (pokemons: genericPokemonType[]) => {
    try {
      const pokemonsData: generatedPokemonType[] = [];
      for await (const pokemon of pokemons) {
        const {
          data,
        }: {
          data: {
            id: number;
            types: { type: genericPokemonType }[];
          };
        } = await axios.get(pokemon.url);
        const types = data.types.map(
          ({ type: { name } }: { type: { name: string } }) => ({
            [name]: pokemonTypes[name],
          })
        );
        let image: string = images[data.id];
        if (!image) {
          image = defaultImages[data.id];
        }
        if (image) {
          console.log(image)
          pokemonsData.push({
            name: pokemon.name,
            id: data.id,
            image:image,
            types,
          });
        }
      }
      return pokemonsData;
    } catch (err) {
      console.error(err);
    }
  }
);
