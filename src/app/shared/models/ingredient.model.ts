export enum IngredientUnits {
    Teaspoon = 'tsp',
    Tablespoon = 'tbsp',
    Cup = 'cup',
    Ounce = 'oz',
    Pound = 'lb',
    Gram = 'g',
    Milliliter = 'ml',
    Liter = 'l',
    FluidOunce = 'fl oz',
    Pint = 'pt',
    Quart = 'qt',
    Gallon = 'gal',
    Piece = 'pc',
    Pinch = 'pinch',
    Dash = 'dash',
    Drop = 'drop'
}

export interface IngredientQuantity{
    number: number,
    unit: IngredientUnits
}

export class Ingredient {
    name: string;
    ammount: IngredientQuantity;

    constructor(name: string, ammount: IngredientQuantity) {
        this.name = name;
        this.ammount = ammount
    }
}  