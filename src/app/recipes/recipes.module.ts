
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecepiesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailsComponent,
        RecipesItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        RecepiesRoutingModule
    ],
    exports: [
        
    ],
    providers: [
        RecipesDetailsComponent
    ],
    bootstrap: []
})
export class RecipesModule{}