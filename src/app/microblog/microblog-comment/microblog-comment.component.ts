import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserDataService } from '../../user-panel/user-data.service';
import { MicroblogComment } from '../../shared/models/microblog-comment.model';
import { UserData } from '../../shared/models/user-data.model';

@Component({
  selector: 'app-microblog-comment',
  templateUrl: './microblog-comment.component.html',
  styleUrl: './microblog-comment.component.scss',
})
export class MicroblogCommentComponent implements OnInit {
  constructor(private userDataService: UserDataService)  {}

  @Input() public microblogComment: MicroblogComment = {id:0, author: '', content:'', likes:{quantity:0,whoLiked:[]}}

  public commentAuthorData = {}

  public ngOnInit(): void {
    const userData = this.userDataService.getUserData(this.microblogComment.author);
    this.commentAuthorData = {email: userData.email, name: userData.name, avatar: userData.avatar}
  }
  
}
