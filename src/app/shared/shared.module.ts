import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';

import { LoadingSpinnerComponent } from './loadingspinner/loading-spinner.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    CommonModule
  ],
  imports: [
    CommonModule
  ],
})
export class SharedModule {}
