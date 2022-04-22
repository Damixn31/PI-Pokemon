import axios from "axios";
export const ALL_POKEMONS = "ALL_POKEMONS";
export const GET_NAMES = "GET_NAMES";
export const GET_DETAILS = "GET_DETAILS";
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMONS = "POST_POKEMONS";
export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_CREATION = "FILTER_CREATION";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_FORCE = "ORDER_BY_FORCE";

export function getAllPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3002/pokemon");
      return dispatch({
        type: ALL_POKEMONS,
        payload: json.data,
        loading: false,
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export const getNames = (name) => {
  return async (dispatch) => {
    // console.log(name)
    try {
      const json = await axios.get(
        `http://localhost:3002/pokemon?name=${name}`
      );
      // console.log(json)
      return dispatch({
        type: GET_NAMES,
        payload: json.data,
      });
    } catch (err) {
      alert("Pokemon Not Found");
    }
  };
};

export const getPokemonId = (id) => {
  return async (dispatch) => {
    
    try {
      const json = await axios.get(`http://localhost:3002/pokemonId/${id}`);
      
      return dispatch({
        type: GET_DETAILS,
        payload: json.data
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    // console.log(props)
    try {
      const json = await axios.get("http://localhost:3002/typeId"); //tengo que modificar en la base de datos la ruta de types
      return dispatch({
        type: GET_TYPES,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addPokemon = (payload) => {
  return async (dispatch) => {
  //  console.log(addPokemon(), 'pokemon creado')
    try {
      const response = await axios.post(
        "http://localhost:3002/pokemonId",
        payload
      );
      return dispatch({
        type: POST_POKEMONS,
        payload: response,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterByType = (payload) => {
  return {
    type: FILTER_TYPES,
    payload,
  };
};

export const filterByCreation = (payload) => {
  return {
    type: FILTER_CREATION,
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByForce = (payload) => {
  return {
    type:ORDER_BY_FORCE,
    payload,
  };
};
