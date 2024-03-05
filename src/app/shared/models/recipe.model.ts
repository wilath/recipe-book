import { FoodType } from "../enums/food-type-enum";
import { FileAnchor } from "./file-upload.model";
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
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard"
}

export class Recipe{
    public id: number;
    public name:string;
    public description:string;
    public images: FileAnchor[];
    public ingredients: Ingredient[];
    public foodType: FoodType;
    public author: string;
    public level: DifficultyLevel;
    public prepTimeMinutes: number;
    public date: Date;
    public likes: Likes;
    public stars: Rating[];
    constructor(id: number, name:string, desc:string, images:FileAnchor[], ingredients: Ingredient[], foodType: FoodType, author: string, level: DifficultyLevel, prepTimeMinutes: number, date: Date, likes?: Likes, stars?: Rating[] ){
        this.id = id
        this.name = name;
        this.description = desc;
        this.images = images;
        this.ingredients = ingredients;
        this.foodType = foodType;
        this.author = author;
        this.level = level;
        this.prepTimeMinutes = prepTimeMinutes;
        this.date = date;
        this.likes = likes || { quantity: 0, whoLiked: [] };
        this.stars = stars || [];
    }

    public get getAverageRating(): number {
        if (this.stars.length === 0) {
            return 0; 
        } else {
            const sum = this.stars.reduce((total, rating) => total + rating.rate, 0);
            return sum / this.stars.length;
        }
    }

    public isLikedByUser(userEmail: string): boolean{
        const likes = this.likes.whoLiked     
        return likes.includes(userEmail)
    }

    public isRatedByUser(userEmail: string): number {
        const userRating = this.stars.find(rating => rating.user === userEmail);
        return userRating ? userRating.rate : 0;
    }
    
}