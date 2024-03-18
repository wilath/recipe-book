import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelRoutingModule } from './user-panel-routing.module';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoDisplayComponent } from './user-info-display/user-info-display.component';
import { SharedModule } from '../shared/shared.module';
import { MicroblogModule } from '../microblog/microblog.module';
import { UserShoppingListComponent } from './user-shopping-list/user-shopping-list.component';


@NgModule({
  declarations: [
    UserPanelComponent,
    UserInfoDisplayComponent,
    UserShoppingListComponent

  ],
  imports: [
    CommonModule,
    UserPanelRoutingModule,
    HttpClientModule,
    SharedModule,
    MicroblogModule
  ]
})
export class UserPanelModule { }
