import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelRoutingModule } from './user-panel-routing.module';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoDisplayComponent } from './user-info-display/user-info-display.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserPanelComponent,
    UserInfoDisplayComponent

  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class UserPanelModule { }
