import { Likes } from "./recipe.model";

export interface MicroblogComment{
    id: number;
    author: string;
    content: string;
    likes: Likes;
}