import { Likes } from "./recipe.model";

export interface Comment{
    id: number;
    author: string;
    content: string;
    likes: Likes;
    date: Date,
}