import axios from "axios";
import { Pokemon } from "@/models/Pokemon";

const JSON_SERVER_URL = "http://localhost:3001";

export async function getPokemonsFromDB(): Promise<Pokemon[]> {
  const res = await axios.get(`${JSON_SERVER_URL}/pokemons`);
  return res.data;
}

export async function addPokemonToDB(pokemon: Pokemon) {
  await axios.post(`${JSON_SERVER_URL}/pokemons`, pokemon);
}

export async function updatePokemonStock(id: number, stock: number) {
  await axios.patch(`${JSON_SERVER_URL}/pokemons/${id}`, { stock });
}

export async function deletePokemon(id: number) {
  await axios.delete(`${JSON_SERVER_URL}/pokemons/${id}`);
}
