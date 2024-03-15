import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinnerComponent } from './components/loadingspinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import {TextFieldModule} from '@angular/cdk/text-field';
import { ClockComponent } from './components/clock/clock.component';
import { LevelsComponent } from './components/levels/levels.component';
import { StarsComponent } from './components/stars/stars.component';
import { CommentComponent } from '../microblog/microblog-comment/microblog-comment.component';
import { RecipesItemComponent } from '../recipes/recipes-list/recipes-item/recipes-item.component';
import { AuthorNamePipe } from './pipes/author-name.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ClockComponent,
    LevelsComponent,
    StarsComponent,
    CommentComponent,
    RecipesItemComponent,
    AuthorNamePipe

  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PickerComponent,
    TextFieldModule,
    ClockComponent,
    LevelsComponent,
    StarsComponent,
    CommentComponent,
    RecipesItemComponent,
    AuthorNamePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PickerComponent,
    TextFieldModule,
    RouterModule
    
  ],
})
export class SharedModule {}
