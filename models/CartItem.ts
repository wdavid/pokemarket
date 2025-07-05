import { Pokemon } from "./Pokemon";

export class CartItem {
  pokemon: Pokemon;
  quantity: number;

  constructor(pokemon: Pokemon, quantity: number = 1) {
    this.pokemon = pokemon;
    this.quantity = quantity;
  }

  getTotalPrice(): number {
    return this.pokemon.price * this.quantity;
  }
}
