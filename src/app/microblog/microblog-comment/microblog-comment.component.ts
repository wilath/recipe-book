import { Component, Input, OnInit } from '@angular/core';
import { ItemComment } from '../../shared/models/microblog-comment.model';
import { SimpleUserdata } from '../../shared/models/user-data.model';
import { UserDataService } from '../../user-panel/user-data.service';
import { MicroblogService } from '../microblog.service';
import { RecipesService } from '../../recipes/recipes.service';

@Component({
  selector: 'app-comment',
  templateUrl: './microblog-comment.component.html',
  styleUrl: './microblog-comment.component.scss',
})
export class CommentComponent implements OnInit {

  constructor(private userDataService: UserDataService, private microblogService: MicroblogService, private recipesService: RecipesService)  {}

  @Input() public comment: ItemComment = {id:0, author: '', content:'', likes:{quantity:0,whoLiked:[]}, date: new Date()};
  
  @Input() public postId: number = 0;

  @Input() public isRecipeOpinion = false;

  public commentAuthorData!: SimpleUserdata;

  public timeSincePosted: string = '';

  public isLikedByCurrentUser : boolean = false;

  public isFollowedByCurrentUser : boolean = false;
  
  public loggedUserEmail: string = '';

  public ngOnInit(): void {
    const userData = this.userDataService.getUserData(this.comment.author);
    this.commentAuthorData = {email: userData.email, name: userData.name, avatar: userData.avatar};

    this.timeSincePosted = this.calculateTimeSincePost(this.comment.date);
    this.loggedUserEmail = JSON.parse(localStorage.getItem('userData') || '{}').email;
    this.isLikedByCurrentUser = this.comment.likes.whoLiked.includes(this.loggedUserEmail);
    this.CheckIfFollowedByCurrentUser();
    
  }

  public onAddLike() { 
    if(!this.isRecipeOpinion){
      this.microblogService.onLikeComment(this.postId, this.comment.id, this.loggedUserEmail, !this.isLikedByCurrentUser);
    } else {
      this.recipesService.onLikeComment(this.postId, this.comment.id, this.loggedUserEmail, !this.isLikedByCurrentUser)
    }
    this.isLikedByCurrentUser = !this.isLikedByCurrentUser;
  }

  public onFollowUser() {
    this.userDataService.addFollowToUser(this.comment.author, this.loggedUserEmail, !this.isFollowedByCurrentUser);
    this.CheckIfFollowedByCurrentUser()
  }

  public onDeleteComment() {
    if(!this.isRecipeOpinion){
      this.microblogService.onDeleteComment(this.postId, this.comment.id)
    } else {
      this.recipesService.onDeleteComment(this.postId, this.comment.id)
    }
  }

  private calculateTimeSincePost(postDate: Date): string {
    const now = new Date();
    
    const diffInMilliseconds = now.getTime() - postDate.getTime();
    const diffInSeconds = diffInMilliseconds / 1000; 
    const diffInMinutes = diffInSeconds / 60; 
    const diffInHours = diffInMinutes / 60; 
    const diffInDays = diffInHours / 24; 
  
    if (diffInDays > 7) {
      return '>7 days';
    } else if (diffInDays >= 1) {
      return Math.floor(diffInDays) + ' days ago';
    } else if (diffInHours >= 1) {
      return Math.floor(diffInHours) + ' hours ago';
    } else if (diffInMinutes >= 1) {
      return Math.floor(diffInMinutes) + ' minutes ago';
    } else {
      return Math.floor(diffInSeconds) + ' seconds ago';
    }
  }

  private CheckIfFollowedByCurrentUser() {
    this.isFollowedByCurrentUser = this.userDataService.checkIfUserisFollowed(this.comment.author, this.loggedUserEmail);
  }
}