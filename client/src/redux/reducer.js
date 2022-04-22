import {
  ALL_POKEMONS,
  GET_NAMES,
  GET_DETAILS,
  GET_TYPES,
  POST_POKEMONS,
  FILTER_TYPES,
  FILTER_CREATION,
  ORDER_BY_NAME,
  ORDER_BY_FORCE,
} from "./action";
const initialState = {
  allPokemons: [],
  pokemons: [],
  detail: [],
  types: [],
  isLoading: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        isLoading: action.loading,
      };
    case GET_NAMES:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        detail: [action.payload],
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case POST_POKEMONS:
      return {
        ...state,
      };
    case FILTER_TYPES:
      const allPokemonTypes = state.allPokemons;
      const filtType = (action.payload === "All"
        ? allPokemonTypes
        : allPokemonTypes.filter((e) => e.types?.includes(action.payload)));
        console.log("tiposfiltrados", filtType)
      return {
        ...state,
        pokemons: filtType,
      };
    case FILTER_CREATION:
      const allPokemoCreation = state.allPokemons;
      const filterCreation =
        action.payload === "createdByUser"
          ? allPokemoCreation.filter((p) => p.createdByUser) //filtro por atributo
          : allPokemoCreation.filter((p) => !p.createdByUser);
      return {
        ...state,
        pokemons: filterCreation,
      };
    case ORDER_BY_NAME:
      const orderNames =
        action.payload === "All"
          ? state.allPokemons
          : action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            })
          : state.pokemons.sort((a, b) => {
              return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
      return {
        ...state,
        pokemons: orderNames,
      };
    case ORDER_BY_FORCE:
      const orderForce =
        action.payload === "All"
          ? state.allPokemons
          : action.payload === "max"
          ? state.pokemons.sort((a, b) => {
              return b.force - a.force;
            })
          : state.pokemons.sort((a, b) => {
              return a.force - b.force;
            });
      return {
        ...state,
        pokemons: orderForce,
      }; 

    default:
      return { ...state };
  }
}

export default rootReducer;
