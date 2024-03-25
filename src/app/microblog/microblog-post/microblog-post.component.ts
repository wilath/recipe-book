/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnChanges } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { fadeIn } from '../../shared/animations/fade-in.animation';
import { slideIn } from '../../shared/animations/slide-in.animation';
import { FileAnchor } from '../../shared/models/file-upload.model';
import { ItemComment } from '../../shared/models/microblog-comment.model';
import { MicroblogPost } from '../../shared/models/microblog-post.model';
import { UserData } from '../../shared/models/user-data.model';
import { SortType } from '../../shared/pipes/date-like-sort.pipe';
import { UserDataService } from '../../user-panel/user-data.service';
import { MicroblogService } from '../microblog.service';

@Component({
  selector: 'app-microblog-post',
  templateUrl: './microblog-post.component.html',
  styleUrl: './microblog-post.component.scss',
  animations: [
    slideIn,
    fadeIn
  ]
})
export class MicroblogPostComponent implements OnChanges {
  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private microblogService: MicroblogService,
    private formBuilder: FormBuilder,
  ) {}
 

  @Input() public microblogPost!: MicroblogPost;

  @Input() public isButtonTextVisible: boolean = true;


  public postAuthor!: UserData;

  public loggedUserEmail: string = '';

  public loggedUserAvatar: FileAnchor | undefined = undefined

  public timeSincePosted: string = '';

  public isLikedByCurrentUser: boolean = false;

  public isCommentSectionOpen: boolean = false;

  public isEmojiPickerVisible: boolean = false;

  public isFollowedByCurrentUser: boolean = false;

  public newCommentForm!: FormGroup;

  public sortType = SortType;

  public choosenSortType: SortType = SortType.sortByLikes;

  public topComment!: ItemComment;

  public ngOnChanges(): void {
    this.postAuthor = this.userDataService.getUserDataByEmail(
      this.microblogPost.author
    );
    this.loggedUserEmail = JSON.parse(
      localStorage.getItem('userData') || '{}'
    ).email;
    this.loggedUserAvatar = this.userDataService.getUserDataByEmail(this.loggedUserEmail).avatar
    this.timeSincePosted = this.calculateTimeSincePost(this.microblogPost.date);
    this.isLikedByCurrentUser = this.microblogPost.likes.whoLiked.includes(
      this.loggedUserEmail
    );
    this.CheckIfFollowedByCurrentUser();
    this.setTopComment();
  }

  public initForm() {
    const content = new FormControl('', [Validators.required]);
    this.newCommentForm = this.formBuilder.group({
      content: content,
    });
  }

  public onSubmit() {
    const newComment: ItemComment = {
      id: this.microblogPost.getHighestCommentId(),
      author: this.loggedUserEmail,
      content: this.newCommentForm.value.content,
      likes: { quantity: 0, whoLiked: [] },
      date: new Date(),
    };
    this.microblogService.onAddCommentToPost(this.microblogPost.id, newComment);
    this.initForm();
  }

  public calculateTimeSincePost(postDate: Date): string {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - postDate.getTime();
    const diffInSeconds = diffInMilliseconds / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInDays > 7) {
      return 'over 7 days ago';
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

  public onLikePost() {
    this.microblogService.onLikePost(
      this.microblogPost.id,
      this.loggedUserEmail,
      !this.isLikedByCurrentUser
    );
    this.isLikedByCurrentUser = !this.isLikedByCurrentUser;
  }

  public openComments() {
    this.isCommentSectionOpen = !this.isCommentSectionOpen;
    this.initForm();
  }

  public onFollowUser() {
    this.userDataService.addFollowToUser(
      this.postAuthor.email,
      this.loggedUserEmail,
      !this.isFollowedByCurrentUser
    );
    this.CheckIfFollowedByCurrentUser();
  }

  public goToUserProfile() {
    this.router.navigate(['user-panel/' + this.postAuthor.id])
  }

  public onDeletePost() {
    this.microblogService.onDeletePost(this.microblogPost.id);
  }

  public showEmojiPanel() {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }

  public addEmoji(event: any) {
    const textArea = <FormControl>this.newCommentForm.get('content');
    (<FormControl>this.newCommentForm.get('content')).setValue(
      `${textArea.value} ${event.emoji.native}`
    );
  }

  public onEnterKey(event: Event): void {
    const EventKey = event as KeyboardEvent;
    if (EventKey.key === 'Enter' && !EventKey.shiftKey) {
      EventKey.preventDefault();
      this.onSubmit();
    }
  }

  public onChangeSortType(sort: SortType) {
    this.choosenSortType = sort;
  }

  private CheckIfFollowedByCurrentUser() {
    this.isFollowedByCurrentUser = this.userDataService.checkIfUserisFollowed(
      this.postAuthor.email,
      this.loggedUserEmail
    );
  }

  private setTopComment() {
    if (this.microblogPost.comments.length > 0) {
      this.topComment = this.microblogPost.comments.reduce((acc, curr) => {
        if (curr.likes.quantity > acc.likes.quantity) {
          return curr;
        } else {
          return acc;
        }
      }, this.microblogPost.comments[0]);
    }
  }
}
