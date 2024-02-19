import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroblogComponent } from './microblog.component';
import { MicroblogRoutingModule } from './microblog-routing.module';
import { MicroblogPostComponent } from './microblog-post/microblog-post.component';
import { MicroblogCommentComponent } from './microblog-comment/microblog-comment.component';
import { MicroblogNewpostComponent } from './microblog-newpost/microblog-newpost.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MicroblogComponent,
    MicroblogPostComponent,
    MicroblogCommentComponent,
    MicroblogNewpostComponent
  ],
  imports: [
    CommonModule,
    MicroblogRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class MicroblogModule { }
