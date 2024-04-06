import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { genericPokemonType } from "../../../utils/types";
import { getPokemonsData } from "../../../store/reducers/getPokemonsData";
import { Loader, PokemonCardsGrid } from "../../../components";

const Evolution: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const pokemonData = useAppSelector(({ pokemonSlice }) => pokemonSlice);
  useEffect(() => {
    const fetchData = async () => {
      const pokemons: genericPokemonType[] =
        pokemonData.currentPokemon!.evolution.map(
          ({ pokemon }: { pokemon: genericPokemonType }) => pokemon
        );
      await dispatch(getPokemonsData(pokemons));
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch, pokemonData.currentPokemon]);

  return (
    <div className="page">
      {isLoaded ? (
        <PokemonCardsGrid pokemons={pokemonData.randomPokemons!} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Evolution;
