
import { Component, Injectable, OnDestroy, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipesDetailsComponent } from '../recipes-details/recipes-details.component';
import { RecipesService } from '../recipes.service';
import { FoodType } from '../../shared/enums/food-type-enum';
import { FoodSort } from '../../shared/enums/food-sort.enum';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],

})

export class RecipesListComponent implements OnInit, OnDestroy {


  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
    private recipeDetailsComponent: RecipesDetailsComponent
    ) {}

  public recipes:Array<Recipe> = [];

  public loggedUserEmail: string = ''

  public chosenFoodCategory: FoodType | null = null;

  public foodCategory = FoodType;

  public foodSort = FoodSort;

  public chosenSortType: FoodSort = FoodSort.Popular;

  public foodSearch: string = '';

  public userSort: boolean = false

  private subscription!: Subscription;
 
  

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  
  onNewRecipe() {
    this.router.navigate(['new'],  {relativeTo: this.route})
  }
  DeleteRecipe(){
    this.recipeDetailsComponent.onDeleteRecipe()
  }
  EditRecipe(){
    this.recipeDetailsComponent.onEditRecipe()
  }
  ToShoplist(){
    this.recipeDetailsComponent.onToShopList()
  }
  showUsersRecipes() {
  }



}
