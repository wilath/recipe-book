import { FoodType } from "../shared/food-type-enum";
import { Ingredient } from "../shared/ingredient.model";

export interface Likes {
    quantity: number,
    whoLiked: string[]
}

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients: Ingredient[];
    public foodType: FoodType;
    public likes: Likes;
    constructor(name:string, desc:string, imagePath:string, ingredients: Ingredient[], foodType: FoodType, likes?: Likes){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.foodType = foodType;
        this.likes = likes || { quantity: 0, whoLiked: [] };
    }
}