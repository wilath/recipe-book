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

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ClockComponent,
    LevelsComponent,
    StarsComponent,
    CommentComponent,

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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PickerComponent,
    TextFieldModule
    
  ],
})
export class SharedModule {}
