import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-supp/auth.guard";
import { UserPanelComponent } from "./user-panel/user-panel.component";
import { UserDataRedirectGuard } from "./user-data-redirect.guard";



const routes: Routes = [
    {
        path: '',
        component: UserPanelComponent,
        canActivate: [AuthGuard, UserDataRedirectGuard]
    },
    {
        path: ':id', 
        component: UserPanelComponent,
        canActivate: [AuthGuard],
        
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserPanelRoutingModule { }