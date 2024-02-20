import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-supp/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { RecipeResolverService } from "./recipes-resolver-service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    {
        path: '', 
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent, },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipesDetailsComponent, },
            { path: ':id/edit', component: RecipeEditComponent, }
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecepiesRoutingModule { }