import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroblogComponent } from './microblog.component';
import { MicroblogRoutingModule } from './microblog-routing.module';
import { MicroblogPostComponent } from './microblog-post/microblog-post.component';
import { MicroblogNewpostComponent } from './microblog-newpost/microblog-newpost.component';
import { SharedModule } from '../shared/shared.module';
import { MicroblogPostPlaceholderComponent } from './microblog-post-placeholder/microblog-post-placeholder.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DateLikePipe } from '../shared/pipes/date-like-sort.pipe';
import { MicroblogPhotosDisplayComponent } from './microblog-photos-display/microblog-photos-display.component';



@NgModule({
  declarations: [
    MicroblogComponent,
    MicroblogPostComponent,
    MicroblogNewpostComponent,
    MicroblogPostPlaceholderComponent,
    MicroblogPhotosDisplayComponent,
    DateLikePipe
  ],
  imports: [
    CommonModule,
    MicroblogRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,  
  ],
  exports: [
    MicroblogPostComponent,
    MicroblogPostPlaceholderComponent,
    DateLikePipe,
    MicroblogPhotosDisplayComponent,

  ]
})
export class MicroblogModule { }
