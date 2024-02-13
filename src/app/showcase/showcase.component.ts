import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { FoodType } from '../shared/food-type-enum';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent implements OnInit, OnDestroy {
  constructor(
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService
  ) {}

  public chosenFoodCategory: FoodType | null = null;

  public foodCategory = FoodType;

  public foodSearch: string = '';

  public recipesSubscription!: Subscription;

  public recipes: Recipe[] = [];

  public ngOnInit(): void {
    this.setRecipes();
  }

  public ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }

  private setRecipes() {
    this.recipes = this.recipesService.getRecipes();

    this.recipesSubscription = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }
}
