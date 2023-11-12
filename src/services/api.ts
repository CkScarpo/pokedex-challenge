import axios from "axios";
import { IGetListPokemons } from "../@types/getAllPokemons";

const api = import.meta.env.VITE_POKEAPI;

export const getAllPokemons = async (): Promise<IGetListPokemons> => {
  try {
    const response = await axios.get<Promise<IGetListPokemons>>(
      `${api}/pokemon?limit=12&offset=0`
    );
    const promiseArr = (await response.data).results.map(async (pokemon) =>
      getPokemonDetail(pokemon.name)
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const resultsPromise = await Promise.all(promiseArr);

    return { ...response.data, results: resultsPromise };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPokemonDetail = async (
  name: string | undefined
): Promise<IGetListPokemons> => {
  try {
    const response = await axios.get<Promise<IGetListPokemons>>(
      `${api}/pokemon/${name}`
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
