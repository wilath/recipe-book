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

  public postAuthor!: {email: string, name: string, avatar?: string};

  public ngOnInit(): void {
    const userData = this.userDataService.getUserData(this.microblogPost.author)
    this.postAuthor = {email: userData.email, name: userData.name, avatar: userData.avatar}
    console.log(this.microblogPost)
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
}
