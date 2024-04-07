import React from "react";
import { IoGitCompare } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { pokemonTypeInterface, userPokemonsType } from "../../utils/types";
import { useAppDispatch } from "../../store/hooks";
import { useLocation, useNavigate } from "react-router";

import "./styles.scss";
import { addToCompare, setCurrentPokemon, setPokemonTab, setToast } from "../../store";
import { addPokemonToList } from "../../store/reducers/addPokemonToList";
import { removePokemonFromUserList } from "../../store/reducers/removePokemonFromUserList";
import { pokemonTabs } from "../../utils/constants";

type PokemonCardsGridProps = {
  pokemons: userPokemonsType[];
};

const PokemonCardsGrid: React.FC<PokemonCardsGridProps> = ({ pokemons }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((data: userPokemonsType) => {
            return (
              <div key={data.id} className="pokemon-card">
                <div className="pokemon-card-list">
                  {location.pathname.includes("/pokemon") ? (
                    <FaPlus
                      className="plus"
                        onClick={() => dispatch(addPokemonToList(data))}
                    />
                  ) : location.pathname.includes("/search") ? (
                    <FaPlus
                      className="plus"
                        onClick={() => dispatch(addPokemonToList(data))}
                    />
                  ) : (
                    <FaTrash
                      className="trash"
                      onClick={async () => {
                        await dispatch(
                          removePokemonFromUserList({ id: data.firebaseId! })
                        );
                        dispatch(setToast("Pokemon Removed Successfully."));
                      }}
                    />
                  )}
                </div>
                <div className="pokemon-card-compare">
                  <IoGitCompare
                    onClick={() => {
                      dispatch(addToCompare(data));
                      dispatch(
                        setToast(
                          `${data.name} has been added to compare queue.`
                        )
                      );
                    }}
                  />
                </div>
                <h3 className="pokemon-card-title">{data.name}</h3>
                <img
                  src={data.image}
                  alt=""
                  className="pokemon-card-image"
                  loading="lazy"
                    onClick={() => {
                      dispatch(setPokemonTab(pokemonTabs.description));
                      dispatch(setCurrentPokemon(undefined));
                      navigate(`/pokemon/${data.id}`);
                    }}
                />
                <div className="pokemon-card-types">
                  {data.types.map(
                    (type: pokemonTypeInterface, index: number) => {
                      const keys = Object.keys(type);
                      return (
                        <div className="pokemon-card-types-type" key={index}>
                          <img
                            src={type[keys[0]].image}
                            alt="pokemon type"
                            className="pokemon-card-types-type-image"
                            loading="lazy"
                          />
                          <h6 className="pokemon-card-types-type-text">
                            {keys[0]}
                          </h6>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PokemonCardsGrid;
