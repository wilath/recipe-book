import { Component, Input, OnInit } from '@angular/core';
import { MicroblogComment } from '../../shared/models/microblog-comment.model';
import { SimpleUserdata } from '../../shared/models/user-data.model';
import { UserDataService } from '../../user-panel/user-data.service';
import { MicroblogService } from '../microblog.service';

@Component({
  selector: 'app-microblog-comment',
  templateUrl: './microblog-comment.component.html',
  styleUrl: './microblog-comment.component.scss',
})
export class MicroblogCommentComponent implements OnInit {

  constructor(private userDataService: UserDataService, private microblogService: MicroblogService)  {}

  @Input() public microblogComment: MicroblogComment = {id:0, author: '', content:'', likes:{quantity:0,whoLiked:[]}, date: new Date()};
  
  @Input() public postId: number = 0;

  public commentAuthorData!: SimpleUserdata;

  public timeSincePosted: string = '';

  public isLikedByCurrentUser : boolean = false;

  public isFollowedByCurrentUser : boolean = false;
  
  public loggedUserEmail: string = '';

  public ngOnInit(): void {
    const userData = this.userDataService.getUserData(this.microblogComment.author);
    this.commentAuthorData = {email: userData.email, name: userData.name, avatar: userData.avatar};
    this.timeSincePosted = this.calculateTimeSincePost(this.microblogComment.date);
    this.loggedUserEmail = JSON.parse(localStorage.getItem('userData') || '{}').email;
    this.isLikedByCurrentUser = this.microblogComment.likes.whoLiked.includes(this.loggedUserEmail);
    this.CheckIfFollowedByCurrentUser();
  }

  public onAddLike() { 
    this.microblogService.onLikeComment(this.postId, this.microblogComment.id, this.loggedUserEmail, !this.isLikedByCurrentUser);
    this.isLikedByCurrentUser = !this.isLikedByCurrentUser;
  }

  public onFollowUser() {
    this.userDataService.addFollowToUser(this.microblogComment.author, this.loggedUserEmail, !this.isFollowedByCurrentUser);
    this.CheckIfFollowedByCurrentUser()
  }

  public onDeleteComment() {
    this.microblogService.onDeleteComment(this.postId, this.microblogComment.id)
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
    this.isFollowedByCurrentUser = this.userDataService.checkIfUserisFollowed(this.microblogComment.author, this.loggedUserEmail);
  }
}