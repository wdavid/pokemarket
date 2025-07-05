import { CartItem } from "./CartItem";
import { Pokemon } from "./Pokemon";

export class Cart {
  items: CartItem[] = [];

  addToCart(pokemon: Pokemon, quantity: number = 1) {
    const existing = this.items.find(item => item.pokemon.id === pokemon.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push(new CartItem(pokemon, quantity));
    }
  }

  updateQuantity(pokemonId: number, quantity: number) {
    const item = this.items.find(item => item.pokemon.id === pokemonId);
    if (item) {
      item.quantity = quantity;
    }
  }


  removeItem(pokemonId: number) {
    this.items = this.items.filter(item => item.pokemon.id !== pokemonId);
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getTotalPrice(), 0);
  }

  clearCart() {
    this.items = [];
  }

  checkout() {
    this.clearCart();
  }
}
