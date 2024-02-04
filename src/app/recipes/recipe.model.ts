import { FoodType } from "../shared/food-type-enum";
import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients: Ingredient[];
    public foodType: FoodType
    
    constructor(name:string, desc:string, imagePath:string, ingredients: Ingredient[], foodType: FoodType){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.foodType = foodType
    }
}