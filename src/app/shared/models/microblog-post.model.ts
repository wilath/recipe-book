import { FileAnchor } from "./file-upload.model";
import { Comment } from "./microblog-comment.model";
import { Likes } from "./recipe.model"

export class MicroblogPost {
    id: number;
    author: string;
    date: Date;
    content: string[];
    images: FileAnchor[];
    likes: Likes;
    comments: Comment[];

    

    constructor(id: number,author: string, date : Date, content: string[], images: FileAnchor[], likes: Likes, comments : Comment[]){
        this.author = author;
        this.date = date;
        this.content = content;
        this.images = images;
        this.likes = likes;
        this.comments = comments
        this.id = id
    }

    
    public getHighestCommentId(): number  {
        if (!this.comments || this.comments.length === 0) {
            return 0; 
        }
        return Math.max(...this.comments.map(comment => comment.id)) + 1;
    }

}