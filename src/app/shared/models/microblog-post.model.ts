import { MicroblogService } from "../../microblog/microblog.service";
import { MicroblogComment } from "./microblog-comment.model";
import { Likes } from "./recipe.model"

export class MicroblogPost {
    id: number;
    author: string;
    title: string;
    date: Date;
    content: string[];
    image: string;
    likes: Likes;
    comments: MicroblogComment[];

    constructor(id: number,author: string, title: string, date : Date, content: string[], image: string, likes: Likes, comments : MicroblogComment[],){
        this.author = author;
        this.title = title;
        this.date = date;
        this.content = content;
        this.image = image;
        this.likes = likes;
        this.comments = comments
        this.id = id
    }

     public gethighestCommentId?(): number  {
        if (!this.comments || this.comments.length === 0) {
            return 0; 
        }
        return Math.max(...this.comments.map(comment => comment.id)) + 1;
    }
}