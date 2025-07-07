"use client";
import { useEffect, useState } from "react";
import { getPokemonsFromDB, addPokemonToDB } from "@/services/jsonServerService";
import { fetchPokemonList } from "@/services/pokemonService";
import { Pokemon } from "@/models/Pokemon";
import PokemonCard from "@/components/PokemonCard";
import Filters from "@/components/Filters";
import { io } from "socket.io-client";

export default function Page() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  async function loadPokemons() {
    setIsLoading(true); 
    const dbPokemons = await getPokemonsFromDB();

    if (dbPokemons.length === 0) {
      console.log("Base de datos vacía, obteniendo desde PokéAPI...");
      const existingIds = new Set(dbPokemons.map(p => p.id));
      const pokeList = await fetchPokemonList(151);
      
      for (const poke of pokeList) {
        if (!existingIds.has(poke.id)) {
          poke.price = Math.floor(Math.random() * 500) + 50;
          poke.stock = Math.floor(Math.random() * 20) + 1;
          await addPokemonToDB(poke);
        }
      }

      const reloaded = await getPokemonsFromDB();
      setPokemons(reloaded);
    } else {
      setPokemons(dbPokemons);
    }

    setIsLoading(false);
  }

  loadPokemons();

  const socket = io("http://localhost:4000");
  socket.on("stockUpdated", () => {
    console.log("Stock actualizado desde socket!");
    loadPokemons();
  });

  return () => {
    socket.disconnect();
  };
}, []);


  const allTypes = Array.from(new Set(pokemons.flatMap((p) => p.types)));

  const filtered = pokemons
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (selectedType ? p.types.includes(selectedType) : true))
    .filter((p) => p.price >= minPrice && p.price <= maxPrice);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "type")
      return (a.types[0] || "").localeCompare(b.types[0] || "");
    return 0;
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Cargando Pokemones...</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Esto puede tardar unos segundos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-14 pb-10">
      <div className="sticky top-16 z-20 bg-white dark:bg-black border-slate-200 dark:border-gray-700 px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <Filters
            search={search}
            setSearch={setSearch}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            types={allTypes}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sorted.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
}
