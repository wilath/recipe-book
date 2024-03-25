import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, map, tap } from 'rxjs';
import { Recipe } from '../shared/models/recipe.model';
import { UserDataService } from '../user-panel/user-data.service';
import { UserNotification } from '../shared/enums/notifications.enum';
import { RealTimeDatabaseService } from '../shared/real-time-database.service';
import { ItemComment } from '../shared/models/microblog-comment.model';

@Injectable()
export class RecipesService implements OnDestroy {
  constructor( private userDataService: UserDataService, private realTimeDatabasService: RealTimeDatabaseService) {}
  
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

  public getRecipe(id: number) {
    const recipeIndex = this.recipes.findIndex(recipe => recipe.id == id);
    
    
    return this.recipes[recipeIndex];
  }

  public getNumberOfRecipesForUser(email: string){
    return this.recipes.filter(recipe => recipe.author === email).length
  }

  public addRecipe(recipe: Recipe) {
    const authorsFollowers = this.userDataService.getUserDataByEmail(recipe.author).followers
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    for(const follower in authorsFollowers){
      this.userDataService.setNotificationToUser(follower, UserNotification.newRecipeByFollow, recipe.author, recipe.name)
    }
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

  public onAddCommentToRecipe(recipeId: number, comment: ItemComment) {
    const newRecipes = this.recipes;
    const recIndex = newRecipes.findIndex((el) => el.id === recipeId);
    if (recIndex !== -1) {
      newRecipes[recIndex].comments.push(comment);
    }
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
    this.userDataService.setNotificationToUser(this.recipes[recIndex].author, UserNotification.commentRecipe, comment.author, this.recipes[recIndex].name)
  }

  public onDeleteComment(recipeId: number, commentId: number) {
    const newRecipes = this.recipes;
    const recipeIndex = newRecipes.findIndex((el) => el.id === recipeId);
    if (recipeIndex !== -1) {
      newRecipes[recipeIndex].comments = newRecipes[recipeIndex].comments.filter(
        (el) => el.id !== commentId
      );
    }
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  public onEditComment(recipeId: number, comment: ItemComment) {
    const newRecipes = this.recipes;
    const recipeIndex = newRecipes.findIndex((el) => el.id === recipeId);

    if (recipeIndex !== -1) {
      newRecipes[recipeIndex].comments = newRecipes[recipeIndex].comments.map((el) => {
        if (el.id === comment.id) {
          return (el = comment);
        } else {
          return el;
        }
      });
    }
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  public onLikeComment(recipeId: number, commentId: number, userEmail: string, add: boolean) {
    const newRecipes = this.recipes;
    const recipeIndex = newRecipes.findIndex((el) => el.id === recipeId);
    const newCommentIndex = newRecipes[recipeIndex].comments.findIndex( el => el.id === commentId)

    if(recipeIndex !== -1) {
      switch (add){
        case true:
          newRecipes[recipeIndex].comments[newCommentIndex].likes.quantity++
          newRecipes[recipeIndex].comments[newCommentIndex].likes.whoLiked.push(userEmail)
        break;
        case false:
          newRecipes[recipeIndex].comments[newCommentIndex].likes.quantity--
          newRecipes[recipeIndex].comments[newCommentIndex].likes.whoLiked = newRecipes[recipeIndex].comments[newCommentIndex].likes.whoLiked.filter(el => el !== userEmail)
        break;
      }
    }
    this.recipes = newRecipes;
    this.recipesChanged.next(this.recipes.slice());
    this.userDataService.setNotificationToUser(this.recipes[recipeIndex].comments[newCommentIndex].author, UserNotification.likedComment, userEmail)
  }
  
}
