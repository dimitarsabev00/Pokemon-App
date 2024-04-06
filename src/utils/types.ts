export interface GeneralSliceInitialState {
  isLoading: boolean;
}

export interface PokemonSliceInitialState {
  allPokemons: null | Pokemon[];
}
export interface Pokemon {
  name: string;
  url: string;
}
