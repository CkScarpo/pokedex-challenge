import axios from "axios";
import { IGetListPokemons, Root } from "../@types/getAllPokemons";

const api = import.meta.env.VITE_POKEAPI;

export const getAllPokemons = async (
  page: number
): Promise<IGetListPokemons> => {
  try {
    const response = await axios.get<Promise<IGetListPokemons>>(
      `${api}/pokemon?limit=${page}&offset=0`
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
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPokemonTypeDetail = async (
  typeId: string | undefined
): Promise<Root> => {
  try {
    const response = await axios.get<Root>(`${api}/type/${typeId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
