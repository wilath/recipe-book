import { Component, OnDestroy, OnInit } from '@angular/core';
import { MicroblogService } from './microblog.service';
import { Subscription } from 'rxjs';
import { MicroblogPost } from '../shared/models/microblog-post.model';
import { SortType } from '../shared/pipes/date-like-sort.pipe';

@Component({
  selector: 'app-microblog',
  templateUrl: './microblog.component.html',
  styleUrl: './microblog.component.scss',
})
export class MicroblogComponent implements OnInit, OnDestroy {
  constructor(private microblogService: MicroblogService) {}

  public posts: MicroblogPost[] = [];

  private microblogSub!: Subscription;

  public SortType = SortType;

  public ngOnInit(): void {
    this.microblogSub = this.microblogService.postsChange.subscribe(posts => {
      this.posts = posts;
      this.microblogService.storeDatainDatabase()
    });
    this.posts = this.microblogService.getMicroblogData()
    
  }
  public ngOnDestroy(): void {
    this.microblogSub.unsubscribe();
  }
}
