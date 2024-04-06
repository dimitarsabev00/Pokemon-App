import React, { useEffect } from "react";
import { Loader, PokemonCardsGrid, Wrapper } from "../../components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getInitialPokemonData } from "../../store/reducers/getInitialPokemonData";
import { getPokemonsData } from "../../store/reducers/getPokemonsData";
import { setLoading } from "../../store";
import { debounce } from "../../utils/debounce";

import "./styles.scss";
const Search: React.FC = () => {
  const handleChange = debounce((value: string) => getPokemon(value), 300);
  const isLoading = useAppSelector(
    ({ generalSlice: { isLoading } }) => isLoading
  );

  const dispatch = useAppDispatch();
  const { allPokemons, randomPokemons } = useAppSelector(
    ({ pokemonSlice }) => pokemonSlice
  );

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    if (allPokemons) {
      const clonedPokemons = [...allPokemons];
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  }, [allPokemons, dispatch]);

  useEffect(() => {
    if (randomPokemons) {
      dispatch(setLoading(false));
    }
  }, [randomPokemons, dispatch]);

  const getPokemon = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemons.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      dispatch(getPokemonsData(pokemons));
    } else {
      const clonedPokemons = [...allPokemons];
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="search">
          <input
            type="text"
            onChange={(e) => handleChange(e.target.value)}
            className="pokemon-searchbar"
            placeholder="Search Pokemon"
          />
          <PokemonCardsGrid pokemons={randomPokemons!} />
        </div>
      )}
    </>
  );
};

export default Wrapper(Search);
