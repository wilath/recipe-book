
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecepiesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { RecipesDetailsComponent } from "./recipes-details/recipes-details.component";
import { FoodSortPipe, FoodTypePipe } from "../shared/pipes/food-type.pipe";
import { AuthorNamePipe } from "../shared/pipes/author-name.pipe";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailsComponent,
        RecipesItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        FoodTypePipe,
        FoodSortPipe,
        AuthorNamePipe
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