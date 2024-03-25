import { Component, OnDestroy, OnInit } from '@angular/core';
import { MicroblogService } from './microblog.service';
import { Subscription } from 'rxjs';
import { MicroblogPost } from '../shared/models/microblog-post.model';
import { SortType } from '../shared/pipes/date-like-sort.pipe';
import { fadeIn } from '../shared/animations/fade-in.animation';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-microblog',
  templateUrl: './microblog.component.html',
  styleUrl: './microblog.component.scss',
  animations: [
    fadeIn
  ]
})
export class MicroblogComponent implements OnInit, OnDestroy {
  constructor(private microblogService: MicroblogService, private responsive: BreakpointObserver) {}

  public isButtonTextVisible: boolean = false;

  public posts: MicroblogPost[] = [];

  private microblogSub!: Subscription;

  public SortType = SortType;

  public isPhotoDisplayOn: boolean = true;

  public ngOnInit(): void {
    this.setMicroblogSub();
    this.setResponsiveSub();
  }

  public ngOnDestroy(): void {
    this.microblogSub.unsubscribe();
  }

  private setMicroblogSub() {
    this.microblogSub = this.microblogService.postsChange.subscribe(posts => {
      this.posts = posts;
      this.microblogService.storeDatainDatabase()
    });
    this.posts = this.microblogService.getMicroblogData()
  }

  private setResponsiveSub(){
    this.responsive.observe(['(min-width: 555px)']).subscribe((res)=>{
      this.isButtonTextVisible = res.matches
    })
  }
}
