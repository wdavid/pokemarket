"use client";
import { Pokemon } from "@/models/Pokemon";

interface Props {
  pokemon: Pokemon;
  onStockChange: (id: number, stock: number) => void;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function AdminPokemonCard({
  pokemon,
  onStockChange,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex flex-col items-center">
      <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mb-2" />
      <h2 className="text-xl font-semibold text-black dark:text-white capitalize mb-1">{pokemon.name}</h2>

      <div className="flex gap-2 mb-2 flex-wrap justify-center">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white px-2 py-1 rounded-full text-xs"
          >
            {type}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
        Precio: <strong>${pokemon.price}</strong>
      </p>

      <div className="flex items-center gap-2 mb-4">
        <label htmlFor={`stock-${pokemon.id}`} className="text-sm text-black dark:text-white">Stock:</label>
        <input
          id={`stock-${pokemon.id}`}
          type="number"
          defaultValue={pokemon.stock}
          className="w-16 px-2 py-1 text-sm border text-black dark:text-white bg-white dark:bg-gray-800 border-gray-300 rounded"
          onChange={(e) => onStockChange(pokemon.id, Number(e.target.value))}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onUpdate(pokemon.id)}
          className="bg-sky-800 hover:bg-sky-500 text-white px-3 py-1 rounded text-sm"
        >
          Actualizar
        </button>
        <button
          onClick={() => onDelete(pokemon.id)}
          className="bg-rose-700 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
