import React from "react";
import { useAppSelector } from "../../../../store/hooks";
import Info from "./Info";
import PokemonContainer from "./PokemonContainer";

import "./styles.scss";

const Description: React.FC = () => {
  const pokemonData = useAppSelector(
    ({ pokemonSlice: { currentPokemon } }) => currentPokemon
  );
  return (
    <>
      <Info data={pokemonData} />
      {pokemonData && <PokemonContainer image={pokemonData.image} />}
    </>
  );
};

export default Description;
