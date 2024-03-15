import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelRoutingModule } from './user-panel-routing.module';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoDisplayComponent } from './user-info-display/user-info-display.component';


@NgModule({
  declarations: [
    UserPanelComponent,
    UserInfoDisplayComponent

  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    HttpClientModule
  ]
})
export class UserPanelModule { }
