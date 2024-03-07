import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinnerComponent } from './components/loadingspinner/loading-spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import {TextFieldModule} from '@angular/cdk/text-field';
import { ClockComponent } from './components/clock/clock.component';
import { LevelsComponent } from './components/levels/levels.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    ClockComponent,
    LevelsComponent
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    CommonModule,
    ReactiveFormsModule,
    PickerComponent,
    TextFieldModule,
    ClockComponent,
    LevelsComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PickerComponent,
    TextFieldModule
    
  ],
})
export class SharedModule {}
