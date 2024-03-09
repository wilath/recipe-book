import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemComment } from '../../shared/models/microblog-comment.model';
import { MicroblogPost } from '../../shared/models/microblog-post.model';
import { UserData } from '../../shared/models/user-data.model';
import { UserDataService } from '../../user-panel/user-data.service';
import { MicroblogService } from '../microblog.service';
import { SortType } from '../../shared/pipes/date-like-sort.pipe';

@Component({
  selector: 'app-microblog-post',
  templateUrl: './microblog-post.component.html',
  styleUrl: './microblog-post.component.scss',
})
export class MicroblogPostComponent implements OnInit {

  constructor(private userDataService: UserDataService, private microblogService: MicroblogService, private formBuilder: FormBuilder) {}


  @Input() public microblogPost!: MicroblogPost

  public postAuthor!: UserData;

  public loggedUserEmail: string = ''

  public timeSincePosted: string = '';

  public isLikedByCurrentUser: boolean = false;

  public isCommentSectionOpen: boolean = false;

  public isEmojiPickerVisible: boolean = false;

  public isFollowedByCurrentUser: boolean = false;
  
  public newCommentForm!: FormGroup;

  public sortType = SortType;

  public choosenSortType: SortType = SortType.sortByLikes;

  public topComment!: ItemComment;

  public ngOnInit(): void {
    this.postAuthor = this.userDataService.getUserData(this.microblogPost.author);
    this.loggedUserEmail = JSON.parse(localStorage.getItem('userData') || '{}').email
    this.timeSincePosted = this.calculateTimeSincePost(this.microblogPost.date);
    this.isLikedByCurrentUser = this.microblogPost.likes.whoLiked.includes(this.loggedUserEmail);
    this.CheckIfFollowedByCurrentUser();
    this.microblogPost.comments.length > 0 ? this.setTopComment() : undefined
  }

  public initForm(){
    let content = new FormControl('', [
      Validators.required]);
    this.newCommentForm = this.formBuilder.group({
      content: content
    })

  }

  public onSubmit() {
    const newComment: ItemComment = {
      id: this.microblogPost.getHighestCommentId(),
      author: this.loggedUserEmail,
      content: this.newCommentForm.value.content,
      likes: {quantity: 0, whoLiked: []},
      date: new Date()
    }
    this.microblogService.onAddCommentToPost(this.microblogPost.id, newComment);
    this.initForm()
  }
  
  public calculateTimeSincePost(postDate: Date): string {
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

  public onLikePost(){
    this.microblogService.onLikePost(this.microblogPost.id, this.loggedUserEmail, !this.isLikedByCurrentUser);
    this.isLikedByCurrentUser = !this.isLikedByCurrentUser;
  }

  public openComments(){
    this.isCommentSectionOpen = !this.isCommentSectionOpen;
    this.initForm();
  }

  public onFollowUser() {
    this.userDataService.addFollowToUser(this.postAuthor.email, this.loggedUserEmail, !this.isFollowedByCurrentUser);
    this.CheckIfFollowedByCurrentUser()
  }

  public onDeletePost(){
    this.microblogService.onDeletePost(this.microblogPost.id)
  }

  public showEmojiPanel() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible
  }
  
  public addEmoji(event: any){
    const textArea = <FormControl>this.newCommentForm.get('content');
    (<FormControl>this.newCommentForm.get('content')).setValue(`${textArea.value} ${event.emoji.native}`)
  }

  public onEnterKey(event: Event): void {
    const EventKey = event as KeyboardEvent
    if (EventKey.key === 'Enter' && !EventKey.shiftKey) {
      EventKey.preventDefault(); 
      this.onSubmit(); 
    }
  }

  public onChangeSortType(sort: SortType){
    this.choosenSortType = sort;
  }
  
  private CheckIfFollowedByCurrentUser() {
    this.isFollowedByCurrentUser = this.userDataService.checkIfUserisFollowed(this.postAuthor.email, this.loggedUserEmail);
  }

  private setTopComment() {
    this.topComment = this.microblogPost.comments.reduce((acc, curr) => {
      if (curr.likes.quantity > acc.likes.quantity) {
        return curr;
      } else {
        return acc;
      }
    }, this.microblogPost.comments[0]);
  }

}
