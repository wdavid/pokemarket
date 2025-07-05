"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Cart } from "@/models/Cart";
import { Pokemon } from "@/models/Pokemon";
import { CartItem } from "@/models/CartItem";

import {
  getFromStorage,
  saveToStorage,
  removeFromStorage,
} from "@/utils/localStorage";

interface CartContextType {
  cart: Cart;
  addToCart: (pokemon: Pokemon, quantity?: number) => void;
  removeFromCart: (pokemonId: number) => void;
  updateQuantity: (pokemonId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(new Cart());
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const storedCart = getFromStorage<Cart>("cart");
    if (storedCart) {
      const newCart = new Cart();
      storedCart.items.forEach((item) => {
        const poke = new Pokemon(
          item.pokemon.id,
          item.pokemon.name,
          item.pokemon.types
        );
        poke.price = item.pokemon.price;
        poke.stock = item.pokemon.stock;
        newCart.addToCart(poke, item.quantity);
      });
      setCart(newCart);
      setTotal(newCart.calculateTotal());
    }
  }, []);

  const addToCart = (pokemon: Pokemon, quantity = 1) => {
    const newCart = new Cart();
    cart.items.forEach((item) => {
      newCart.addToCart(item.pokemon, item.quantity);
    });

    newCart.addToCart(pokemon, quantity);
    setCart(newCart);
    setTotal(newCart.calculateTotal());
    saveToStorage("cart", newCart);
  };

  const removeFromCart = (pokemonId: number) => {
    const newCart = new Cart();
    cart.items.forEach((item) => {
      newCart.addToCart(item.pokemon, item.quantity);
    });

    newCart.removeItem(pokemonId);
    setCart(newCart);
    setTotal(newCart.calculateTotal());
    saveToStorage("cart", newCart);
  };

  const updateQuantity = (pokemonId: number, quantity: number) => {
    const newCart = new Cart();
    cart.items.forEach((item) => {
      newCart.addToCart(item.pokemon, item.quantity);
    });

    newCart.updateQuantity(pokemonId, quantity);
    setCart(newCart);
    setTotal(newCart.calculateTotal());
    saveToStorage("cart", newCart);
  };

  const clearCart = () => {
    const newCart = new Cart();
    setCart(newCart);
    setTotal(0);
    removeFromStorage("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}
