import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Observable } from "rxjs-compat";

import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService implements OnInit {

    constructor(private slService: ShoppingListService){}

    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];




    ngOnInit() {

    }
    getRecipes() {
        return this.recipes.slice();
    }
    getRecipe(index:number){
        return this.recipes[index];
    }
    addRecipeIng(ings: Ingredient[]) {
        this.slService.addRecipeIng2(ings);
    }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index:number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }
    deleteRecepie(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());

    }
    setRecepies(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    

}
