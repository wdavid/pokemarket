export class Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    price: number;
    stock: number;

    constructor(
        id: number,
        name: string,
        types: string[] = [],
        price?: number,
        stock?: number
    ) {
        this.id = id;
        this.name = name;
        this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        this.types = types ?? [];
        this.price = price ?? this.generateRandomPrice();
        this.stock = stock ?? this.generateRandomStock();
    }

    private generateRandomPrice(): number {
        return Math.floor(Math.random() * (500 - 50 + 1)) + 50;
    }

    private generateRandomStock(): number {
        return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    }
}
