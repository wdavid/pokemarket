"use client";
import { useCart } from "@/context/CartContext";
import { Pokemon } from "@/models/Pokemon";

interface CartItemProps {
  pokemon: Pokemon;
  quantity: number;
}

export default function CartItem({ pokemon, quantity }: CartItemProps) {
  const { removeFromCart, updateQuantity } = useCart();

  const subtotal = pokemon.price * quantity;

  const handleIncrement = () => {
    if (quantity < pokemon.stock) {
      updateQuantity(pokemon.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(pokemon.id, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border dark:border-gray-700 p-4 rounded-xl shadow-sm bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="h-20 w-20 rounded-md border dark:border-gray-600"
        />
        <div>
          <h2 className="font-semibold capitalize text-lg dark:text-white">
            {pokemon.name}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Precio: ${pokemon.price}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              -
            </button>
            <span className="px-3 dark:text-white">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50"
              disabled={quantity >= pokemon.stock}
            >
              +
            </button>
          </div>
          <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">
            Subtotal: ${subtotal}
          </p>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(pokemon.id)}
        className="mt-3 sm:mt-0 px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
      >
        Quitar
      </button>
    </div>
  );
}
