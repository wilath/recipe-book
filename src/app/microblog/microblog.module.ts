import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroblogComponent } from './microblog/microblog.component';
import { MicroblogRoutingModule } from './microblog-routing.module';
import { MicroblogPostComponent } from './microblog-post/microblog-post.component';



@NgModule({
  declarations: [
    MicroblogComponent,
    MicroblogPostComponent
  ],
  imports: [
    CommonModule,
    MicroblogRoutingModule,
  ]
})
export class MicroblogModule { }
