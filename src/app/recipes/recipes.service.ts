import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription, map, tap } from 'rxjs';

import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from '../shared/models/recipe.model';
import { UserDataService } from '../user-panel/user-data.service';
import { UserNotification } from '../shared/enums/notifications.enum';
import { RealTimeDatabaseService } from '../shared/real-time-database.service';

@Injectable()
export class RecipesService implements OnDestroy   {
  constructor(private shoppingListService: ShoppingListService, private userDataService: UserDataService, private realTimeDatabasService: RealTimeDatabaseService) {}
  
  public recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  private storeRecipes$: Subscription = this.recipesChanged.subscribe(()=> {
    this.realTimeDatabasService.storeRecipes(this.recipes)
  })

 
   public ngOnDestroy(): void {
    this.storeRecipes$.unsubscribe()
  }

  public setRecepies(): Observable<void> {
    return this.realTimeDatabasService.fetchRecipes().pipe(
      tap((recipesToSet: Recipe[]) => {
        if (recipesToSet) {
          this.recipes = recipesToSet;
          this.recipesChanged.next(this.recipes.slice());
        }
      }),map(() => {})
    );
  }

  public addLikeToRecipe(recipeName: string, whoLiked: string, add: boolean) {
    const index = this.recipes.findIndex(
      (recipe) => recipe.name === recipeName
    );
    const newRecipes = this.recipes
    const recipeToUpdate: Recipe = this.recipes[index];
    if (add) {
      recipeToUpdate.likes.quantity++;
      recipeToUpdate.likes.whoLiked.push(whoLiked);
    } else {
      recipeToUpdate.likes.quantity--;
      const index = recipeToUpdate.likes?.whoLiked.indexOf(whoLiked);
      if (index !== -1) {
        recipeToUpdate.likes?.whoLiked.splice(index, 1);
      }
    }

    newRecipes[index] = recipeToUpdate;
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
    
    if(add){
    this.userDataService.setNotificationToUser(recipeToUpdate.author, UserNotification.recipeLiked, whoLiked, recipeToUpdate.name)
    }

  }

  public addRateToRecipe(recipeName: string, whoRated: string, rate: number){
    const index = this.recipes.findIndex(
     (recipe) => recipe.name === recipeName
    );
    const newRecipes = this.recipes;
    const recipeToUpdate: Recipe = this.recipes[index];
    const userRatingIndex = recipeToUpdate.stars.findIndex(rating => rating.user === whoRated);
    if(userRatingIndex === -1) {
      recipeToUpdate.stars.push({user: whoRated, rate: rate})
    } else {
      const userRatingIndex = recipeToUpdate.stars.findIndex(rating => rating.user === whoRated);
      recipeToUpdate.stars[userRatingIndex].rate = rate;
    }

    newRecipes[index] = recipeToUpdate;
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
    this.userDataService.setNotificationToUser(recipeToUpdate.author, UserNotification.recipeRated, whoRated, recipeToUpdate.name, rate.toString())
  }

  public getRecipes() {
    return this.recipes.slice();
  }

  public getRecipe(index: number) {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id === index)
    return this.recipes[recipeIndex];
  }

  public addRecipeIng(ings: Ingredient[]) {
    this.shoppingListService.addRecipeIng2(ings);
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(newRecipe: Recipe) {
    const index = this.recipes.findIndex( recipe => recipe.id === newRecipe.id);
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  public deleteRecepie(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
  
  public getIdforNewRecipe():number{  
    if (!this.recipes || this.recipes.length === 0) {
      return 0; 
    }
    return Math.max(...this.recipes.map(rec => rec.id)) + 1;
  }
  
}
