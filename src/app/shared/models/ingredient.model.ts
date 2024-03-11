export enum IngredientUnits {
    Teaspoon = 'tsp',
    Tablespoon = 'tbsp',
    Cup = 'cup',
    Ounce = 'oz',
    Pound = 'lb',
    Gram = 'g',
    Kilogram = 'kg',
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


export class Ingredient {
    name: string;
    ammount: number;
    unit: IngredientUnits

    constructor(name: string, ammount: number, unit: IngredientUnits) {
        this.name = name;
        this.ammount = ammount;
        this.unit = unit
    }
}  