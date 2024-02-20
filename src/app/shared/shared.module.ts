import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';

import { LoadingSpinnerComponent } from './loadingspinner/loading-spinner.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    CommonModule,
    ReactiveFormsModule

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {}
