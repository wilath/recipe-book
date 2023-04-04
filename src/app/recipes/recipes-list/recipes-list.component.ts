
import { Component, Injectable, OnDestroy, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesDetailsComponent } from '../recipes-details/recipes-details.component';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],

})


export class RecipesListComponent implements OnInit, OnDestroy {
  recipes:Array<Recipe> =[];
  subscription: Subscription;
  animationStatus: boolean = true

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
    private goManage: RecipesDetailsComponent
    ) {
   }



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
    this.goManage.onDeleteRecipe()
  }
  EditRecipe(){
    this.goManage.onEditRecipe()
  }
  ToShoplist(){
    this.goManage.onToShopList()
  }


}
