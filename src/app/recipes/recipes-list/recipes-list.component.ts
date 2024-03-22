
import { Component, OnDestroy, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipesDetailsComponent } from '../recipes-details/recipes-details.component';
import { RecipesService } from '../recipes.service';
import { FoodType } from '../../shared/enums/food-type-enum';
import { FoodSort } from '../../shared/enums/food-sort.enum';
import { fadeIn } from '../../shared/animations/fade-in.animation';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  animations: [
    fadeIn
  ]

})

export class RecipesListComponent implements OnInit, OnDestroy {


  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
    private responsive: BreakpointObserver
    ) {}

  public isScreenSmall: boolean = false;

  public recipes:Array<Recipe> = [];

  public loggedUserEmail: string = ''

  public chosenFoodCategory: FoodType | null = null;

  public foodCategory = FoodType;

  public foodSort = FoodSort;

  public chosenSortType: FoodSort = FoodSort.Popular;

  public foodSearch: string = '';

  private recipeSub!: Subscription;
 
  ngOnInit() {
   this.setRecipeSub()
   this.setResponsiveSub()

  }
  ngOnDestroy(){
    this.recipeSub.unsubscribe();
  }

  
  public onNewRecipe() {
    this.router.navigate(['new'],  {relativeTo: this.route})
  }

  private setRecipeSub(){
    this.recipeSub = this.recipeService.recipesChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  private setResponsiveSub(){
    this.responsive.observe(['(min-width:600px)']).subscribe( res => {
      this.isScreenSmall = !res.matches
      console.log(this.isScreenSmall)
    })
  }
  



}
