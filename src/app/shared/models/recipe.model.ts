import { FoodType } from "../enums/food-type-enum";
import { Ingredient } from "./ingredient.model";

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
    public author: string;
    public likes: Likes;
    constructor(name:string, desc:string, imagePath:string, ingredients: Ingredient[], foodType: FoodType, author: string, likes?: Likes,){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.foodType = foodType;
        this.author = author;
        this.likes = likes || { quantity: 0, whoLiked: [] };
    }
}