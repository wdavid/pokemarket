"use client";
import { Pokemon } from "@/models/Pokemon";
import { useCart } from "@/context/CartContext";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const { addToCart, cart } = useCart();

  const quantityInCart =
    cart.items.find((item) => item.pokemon.id === pokemon.id)?.quantity || 0;

  const isOutOfStock = pokemon.stock === 0;
  const isLimitReached = quantityInCart >= pokemon.stock;

  return (
    <div
      className="rounded-lg p-4 text-black dark:text-white hover:shadow-lg transition bg-gray-50 dark:bg-gray-900 shadow-lg shadow-gray-300 dark:shadow-gray-800"
    >
      <img src={pokemon.image} alt={pokemon.name} className="mx-auto h-32" />
      <div>
        <h2 className="font-bold capitalize text-lg mt-2">{pokemon.name}</h2>
        <p className="text-sm">Tipos: {pokemon.types.join(", ")}</p>
        <p className="text-sm">Precio: ${pokemon.price}</p>
        <p className="text-sm mb-2">Stock: {pokemon.stock}</p>
      </div>

      <div className="w-full">
        <button
          onClick={() => addToCart(pokemon)}
          className="mt-2 px-3 py-2 rounded-md font-medium w-full bg-sky-700 text-white hover:opacity-80 transition disabled:opacity-50"
          disabled={isOutOfStock || isLimitReached}
        >
          {isOutOfStock
            ? "Agotado"
            : isLimitReached
            ? "Límite alcanzado"
            : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}
