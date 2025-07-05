import api from "@/utils/api";
import { Pokemon } from "@/models/Pokemon";

export async function fetchPokemonList(limit = 151): Promise<Pokemon[]> {
  try {
    const res = await api.get(`/pokemon?limit=${limit}`);
    const results = res.data.results;

    const pokemonList: Pokemon[] = await Promise.all(
      results.map(async (poke: any, index: number) => {
        const id = index + 1;

        const detailRes = await api.get(`/pokemon/${id}`);
        const types = detailRes.data.types.map((t: any) => t.type.name);

        return new Pokemon(id, poke.name, types);
      })
    );

    return pokemonList;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
}
