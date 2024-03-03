import { FoodType } from "../enums/food-type-enum";
import { Ingredient } from "./ingredient.model";

export interface Likes {
    quantity: number,
    whoLiked: string[]
}

export interface Rating {
    user: string, 
    rate: number
}

export enum DifficultyLevel{
    Easy,
    Medium,
    Hard
}

export class Recipe{
    public name:string;
    public description:string;
    public imagePath:string;
    public ingredients: Ingredient[];
    public foodType: FoodType;
    public author: string;
    public level: DifficultyLevel;
    public prepTimeMinutes: number;
    public date: Date;
    public likes: Likes;
    public stars: Rating[];
    constructor(name:string, desc:string, imagePath:string, ingredients: Ingredient[], foodType: FoodType, author: string, level: DifficultyLevel, prepTimeMinutes: number, date: Date, likes?: Likes, ){
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.foodType = foodType;
        this.author = author;
        this.level = level;
        this.prepTimeMinutes = prepTimeMinutes;
        this.date = date;
        this.likes = likes || { quantity: 0, whoLiked: [] };
        this.stars = [];
    }
}