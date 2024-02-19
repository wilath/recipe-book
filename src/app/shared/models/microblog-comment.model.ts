import { Likes } from "./recipe.model";

export interface MicroblogComment{
    author: string;
    content: string;
    likes: Likes;
}