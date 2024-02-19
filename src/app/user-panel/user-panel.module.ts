import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelRoutingModule } from './user-panel-routing.module';
import { UserPanelComponent } from './user-panel/user-panel.component';


@NgModule({
  declarations: [
    UserPanelComponent

  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule
  ]
})
export class UserPanelModule { }
