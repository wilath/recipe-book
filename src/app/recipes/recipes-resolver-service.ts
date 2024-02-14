import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStoragaService } from "../shared/data-storage.service";

import { Recipe } from "../shared/models/recipe.model";
import { RecipesService } from "./recipes.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService  {
    constructor(private dataStorageService: DataStoragaService,
        private recipeService: RecipesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0){ return this.dataStorageService.fetchRecipes()} else  {
            return recipes;
        }
      
    }
}
