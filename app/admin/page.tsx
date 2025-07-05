"use client";
import { useEffect, useState } from "react";
import {
  getPokemonsFromDB,
  updatePokemonStock,
  deletePokemon,
} from "@/services/jsonServerService";
import { Pokemon } from "@/models/Pokemon";
import AdminPokemonCard from "@/components/AdminPokemonCard";
import Filters from "@/components/Filters";
import withAuth from "@/components/withAuth";

function AdminPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [stockUpdates, setStockUpdates] = useState<{ [key: number]: number }>(
    {}
  );
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    const data = await getPokemonsFromDB();
    setPokemons(data);
  };

  const handleStockChange = (id: number, newStock: number) => {
    setStockUpdates((prev) => ({ ...prev, [id]: newStock }));
  };

  const handleUpdate = async (id: number) => {
    if (!stockUpdates[id]) return;
    await updatePokemonStock(id, stockUpdates[id]);
    await fetchPokemons();

    await fetch("http://localhost:4000/notify-update", {
      method: "POST",
    });
  };

  const handleDelete = async (id: number) => {
    await deletePokemon(id);
    await fetchPokemons();
  };

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

  return (
    <div className="px-4 pt-14 pb-10">
      <div className="sticky top-16 z-20 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 px-4 mb-6">
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

      <h1 className="text-2xl font-bold text-black dark:text-white text-center mb-6">
        Panel de Administración
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sorted.map((pokemon) => (
          <AdminPokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onStockChange={handleStockChange}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default withAuth(AdminPage, ["admin"]);
