import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Login, PokemonCardsGrid, Wrapper } from "../../components";

import "./styles.scss";
import { getUserPokemons } from "../../store/reducers/getUserPokemons";
const MyList: React.FC = () => {
  const { userInfo } = useAppSelector(({ generalSlice }) => generalSlice);
  const { userPokemons } = useAppSelector(({ pokemonSlice }) => pokemonSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
  dispatch(getUserPokemons());
  }, [userInfo, dispatch]);
  return (
    <div className="list">
      {userInfo ? <PokemonCardsGrid pokemons={userPokemons} /> : <Login />}
    </div>
  );
};

export default Wrapper(MyList);
