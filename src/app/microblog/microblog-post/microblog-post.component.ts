import { Component, Input, OnInit } from '@angular/core';
import { MicroblogPost } from '../../shared/models/microblog-post.model';
import { UserDataService } from '../../user-panel/user-data.service';
import { SimpleUserdata, UserData } from '../../shared/models/user-data.model';
import { MicroblogService } from '../microblog.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MicroblogComment } from '../../shared/models/microblog-comment.model';

@Component({
  selector: 'app-microblog-post',
  templateUrl: './microblog-post.component.html',
  styleUrl: './microblog-post.component.scss',
})
export class MicroblogPostComponent implements OnInit {
  constructor(private userDataService: UserDataService, private microblogService: MicroblogService, private formBuilder: FormBuilder) {}

  @Input() public microblogPost!: MicroblogPost

  public postAuthor!: SimpleUserdata

  private loggedUserEmail: string = ''

  public timeSincePosted: string = '';

  public isLikedByCurrentUser: boolean = false;

  public isCommentSectionOpen: boolean = false;

  public newCommentForm!: FormGroup;

  public isEmojiPickerVisible: boolean = false;
  

  public ngOnInit(): void {
    const userData = this.userDataService.getUserData(this.microblogPost.author);
    this.postAuthor = {email: userData.email, name: userData.name, avatar: userData.avatar};
    this.loggedUserEmail = JSON.parse(localStorage.getItem('userData') || '{}').email
    this.timeSincePosted = this.calculateTimeSincePost(this.microblogPost.date);
    this.isLikedByCurrentUser = this.microblogPost.likes.whoLiked.includes(this.loggedUserEmail)
  }

  public initForm(){
    let content = new FormControl('');
    this.newCommentForm = this.formBuilder.group({
      content: content
    })

  }

  public onSubmit() {
    const newComment: MicroblogComment = {
      id: this.microblogPost.getHighestCommentId(),
      author: this.loggedUserEmail,
      content: this.newCommentForm.value.content,
      likes: {quantity: 0, whoLiked: []},
      date: new Date()
    }
    this.microblogService.onAddCommentToPost(this.microblogPost.id, newComment);
    this.initForm()
  }
  
  public showEmojiPanel() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible
  }

  public addEmoji(event: any){
    const textArea = <FormControl>this.newCommentForm.get('content');
    (<FormControl>this.newCommentForm.get('content')).setValue(`${textArea.value} ${event.emoji.native}`)
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

}
