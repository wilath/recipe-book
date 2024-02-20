import { Component, Input, OnInit } from '@angular/core';
import { MicroblogPost } from '../../shared/models/microblog-post.model';
import { UserDataService } from '../../user-panel/user-data.service';
import { UserData } from '../../shared/models/user-data.model';

@Component({
  selector: 'app-microblog-post',
  templateUrl: './microblog-post.component.html',
  styleUrl: './microblog-post.component.scss',
})
export class MicroblogPostComponent implements OnInit {

  constructor(private userDataService: UserDataService) {}

  @Input() public microblogPost!: MicroblogPost

  public postAuthor = {}

  ngOnInit(): void {
    const userData = this.userDataService.getUserData(this.microblogPost.author)
    this.postAuthor = {email: userData.email, name: userData.name, avatar: userData.avatar}
  }
}
