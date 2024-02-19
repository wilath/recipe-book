import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-supp/auth.guard";
import { MicroblogComponent } from "./microblog/microblog.component";


const routes: Routes = [
    {
        path: '', 
        component: MicroblogComponent ,
        canActivate: [AuthGuard],       
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MicroblogRoutingModule { }