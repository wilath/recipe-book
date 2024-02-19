import { MicroblogComment } from "./microblog-comment.model";
import { Likes } from "./recipe.model"

export class MicroblogPost {
    author: string;
    title: string;
    date: Date;
    content: string[];
    image: string;
    likes: Likes;
    comments: MicroblogComment[];

    constructor(author: string, title: string, date : Date, content: string[], image: string, likes: Likes, comments : MicroblogComment[]){
        this.author = author;
        this.title = title;
        this.date = date;
        this.content = content;
        this.image = image;
        this.likes = likes;
        this. comments = comments
    }
}