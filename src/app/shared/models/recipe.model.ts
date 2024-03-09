import { FoodType } from "../enums/food-type-enum";
import { FileAnchor } from "./file-upload.model";
import { Ingredient } from "./ingredient.model";
import { ItemComment } from "./microblog-comment.model";

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

export interface Description{
    main: string,
    steps: string[]
}

export class Recipe{
    public id: number;
    public name:string;
    public description:Description;
    public images: FileAnchor[];
    public ingredients: Ingredient[];
    public foodType: FoodType;
    public author: string;
    public level: DifficultyLevel;
    public prepTimeMinutes: number;
    public date: Date;
    public comments: ItemComment[];
    public likes: Likes;
    public stars: Rating[];
    constructor(id: number, name:string, desc:Description, images:FileAnchor[], ingredients: Ingredient[], foodType: FoodType, author: string, level: DifficultyLevel, prepTimeMinutes: number, date: Date, comments: ItemComment[], likes?: Likes, stars?: Rating[] ){
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
        this.comments = comments || [];
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

    public getHighestCommentId(): number  {
        if (!this.comments || this.comments.length === 0) {
            return 0; 
        }
        return Math.max(...this.comments.map(comment => comment.id)) + 1;
    }

    public isLikedByUser(userEmail: string): boolean{
        const likes = this.likes.whoLiked     
        if(likes){
            return likes.includes(userEmail)
        } else {
            return false
        }
    }

    public isRatedByUser(userEmail: string): number {
        const userRating = this.stars.find(rating => rating.user === userEmail);
        return userRating ? userRating.rate : 0;
    }
    
}