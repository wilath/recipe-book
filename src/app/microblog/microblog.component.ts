import { Component, OnDestroy, OnInit } from '@angular/core';
import { MicroblogService } from './microblog.service';
import { Subscription } from 'rxjs';
import { MicroblogPost } from '../shared/models/microblog-post.model';

@Component({
  selector: 'app-microblog',
  templateUrl: './microblog.component.html',
  styleUrl: './microblog.component.scss',
})
export class MicroblogComponent implements OnInit, OnDestroy {
  constructor(private microblogService: MicroblogService) {}

  public posts: MicroblogPost[] = [];

  private microblogSub!: Subscription;

  public ngOnInit(): void {
    this.microblogSub = this.microblogService.postsChange.subscribe(posts => {
      this.posts = posts;
    });
    this.posts = this.microblogService.getMicroblogData()
    
  }
  public ngOnDestroy(): void {
    this.microblogSub.unsubscribe();
  }
}
