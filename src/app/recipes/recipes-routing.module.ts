import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-supp/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    {
        path: '', 
        component: RecipesComponent,
        canActivate: [AuthGuard],      
    },
    {
        path: 'new',
        component: RecipeEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':id',
        component: RecipesDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: ':id/edit',
        component: RecipeEditComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecepiesRoutingModule { }