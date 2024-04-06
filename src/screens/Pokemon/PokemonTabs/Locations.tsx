import { useAppSelector } from "../../../store/hooks";

import './styles.scss'
const Locations = ()=> {
  const pokemonData = useAppSelector(
    ({ pokemonSlice: { currentPokemon } }) => currentPokemon
  );
  return (
    <div className="pokemon-locations">
      <ul className="pokemon-locations-list">
        {pokemonData?.encounters.map((encounter: string) => (
          <li key={encounter} className="pokemon-location">
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Locations;
