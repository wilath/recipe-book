import { Likes } from "./recipe.model";

export interface ItemComment{
    id: number;
    author: string;
    content: string;
    likes: Likes;
    date: Date,
}