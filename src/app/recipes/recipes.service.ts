import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Likes, Recipe } from './recipe.model';

@Injectable()
export class RecipesService {
  constructor(private shoppingListService: ShoppingListService) {}

  public recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  public addLikeToRecipe(recipeName: string, whoLiked: string) {
    const index = this.recipes.findIndex( recipe => recipe.name === recipeName)
    const newRecipe: Recipe = this.recipes[index]
    newRecipe.likes.quantity++;
    newRecipe.likes?.whoLiked.push(whoLiked);

    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public getRecipes() {
    return this.recipes.slice();
  }
  public getRecipe(index: number) {
    return this.recipes[index];
  }
  public addRecipeIng(ings: Ingredient[]) {
    this.shoppingListService.addRecipeIng2(ings);
  }
  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  public deleteRecepie(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  public setRecepies(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
