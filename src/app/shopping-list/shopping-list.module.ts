
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth-supp/auth.guard";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
    ],
    exports: [],
    imports: [
        
        SharedModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent, canActivate: [AuthGuard],}
        ])
    ],
    providers: []
})
export class ShoppingListModule{}