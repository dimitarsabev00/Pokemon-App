import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { extractColors } from "extract-colors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from "axios";
import { Loader, Wrapper } from "../../components";
import { defaultImages, images } from "../../utils/pokemonImages";

import "./styles.scss";
import { API_URL, pokemonTabs } from "../../utils/constants";
import { setCurrentPokemon, setPokemonTab } from "../../store";
import Evolution from "./PokemonTabs/Evolution";
import Locations from "./PokemonTabs/Locations";
import CapableMoves from "./PokemonTabs/CapableMoves";
import Description from "./PokemonTabs/Description/Description";

function Pokemon() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const currentPokemonTab = useAppSelector(
    ({ generalSlice: { currentPokemonTab } }) => currentPokemonTab
  );
  const currentPokemon = useAppSelector(
    ({ pokemonSlice: { currentPokemon } }) => currentPokemon
  );

  useEffect(() => {
    dispatch(setPokemonTab(pokemonTabs.description));
  }, [dispatch]);

  const getRecursiveEvolution = useCallback(
    (evolutionChain, level, evolutionData) => {
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "pokemon-species",
              "pokemon"
            ),
          },
          level,
        });
      }
      evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
      });
      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData
      );
    },
    []
  );

  const getEvolutionData = useCallback(
    (evolutionChain) => {
      const evolutionData = [];
      getRecursiveEvolution(evolutionChain, 1, evolutionData);
      return evolutionData;
    },
    [getRecursiveEvolution]
  );

  const [isDataLoading, setIsDataLoading] = useState(true);
  const getPokemonInfo = useCallback(
    async (image) => {
      const { data } = await axios.get(`${API_URL}/pokemon/${params.id}`);
      const { data: dataEncounters } = await axios.get(
        data.location_area_encounters
      );

      const {
        data: {
          evolution_chain: { url: evolutionURL },
        },
      } = await axios.get(`${API_URL}/pokemon-species/${data.id}`);
      const { data: evolutionData } = await axios.get(evolutionURL);

      const pokemonAbilities = {
        abilities: data.abilities.map(({ ability }) => ability.name),
        moves: data.moves.map(({ move }) => move.name),
      };

      const encounters = [];
      const evolution = getEvolutionData(evolutionData.chain);
      let evolutionLevel;
      evolutionLevel = evolution.find(
        ({ pokemon }) => pokemon.name === data.name
      ).level;
      dataEncounters.forEach((encounter) => {
        encounters.push(
          encounter.location_area.name.toUpperCase().split("-").join(" ")
        );
      });
      const stats = await data.stats.map(({ stat, base_stat }) => ({
        name: stat.name,
        value: base_stat,
      }));
      dispatch(
        setCurrentPokemon({
          id: data.id,
          name: data.name,
          types: data.types.map(({ type: { name } }) => name),
          image,
          stats,
          encounters,
          evolutionLevel,
          evolution,
          pokemonAbilities,
        })
      );
      setIsDataLoading(false);
    },
    [params.id, dispatch, getEvolutionData]
  );

  useEffect(() => {
    const imageElemet = document.createElement("img");
    imageElemet.src = images[params.id];
    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    };
    const getColor = async () => {
      const color = await extractColors(imageElemet.src, options);
      const root = document.documentElement;
      root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };
    getColor();
    let image = images[params.id];
    if (!image) {
      image = defaultImages[params.id];
    }

    getPokemonInfo(image);
  }, [params.id, getPokemonInfo]);

  return (
    <>
      {!isDataLoading && currentPokemon ? (
        <>
          {currentPokemonTab === pokemonTabs.description && <Description />}
          {currentPokemonTab === pokemonTabs.evolution && <Evolution />}
          {currentPokemonTab === pokemonTabs.locations && <Locations />}
          {currentPokemonTab === pokemonTabs.moves && <CapableMoves />}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Wrapper(Pokemon);
