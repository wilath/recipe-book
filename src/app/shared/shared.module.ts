import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loadingspinner/loading-spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import {TextFieldModule} from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    CommonModule,
    ReactiveFormsModule,
    PickerComponent,
    TextFieldModule

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PickerComponent,
    TextFieldModule
    
  ],
})
export class SharedModule {}
