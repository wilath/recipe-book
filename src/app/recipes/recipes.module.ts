
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecepiesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { FoodSortPipe, FoodTypePipe } from "../shared/pipes/food-type.pipe";
import { PrepTimePercentPipe } from "../shared/pipes/prepTime-to-perecent.pipe";
import { VarDirective } from "../shared/directives/ngvar-directive";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailsComponent,
        RecipeEditComponent,
        FoodTypePipe,
        FoodSortPipe,
        PrepTimePercentPipe,
        VarDirective
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        SharedModule,
        RecepiesRoutingModule,
        FormsModule
    ],
    exports: [

    ],
    providers: [
        RecipesDetailsComponent
    ],
    bootstrap: []
})
export class RecipesModule{}