import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss'],
})
export class RecipesDetailsComponent implements OnInit {
  recipeToDisplay!: Recipe;
  recipeToDisplayId: number = 0;

  constructor(
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeToDisplayId = +params['id'];
      this.recipeToDisplay = this.recipesService.getRecipe(
        this.recipeToDisplayId
      );
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route})
  }

  onDeleteRecipe() {
    console.log(this.recipeToDisplayId);
    this.recipesService.deleteRecepie(this.recipeToDisplayId);
    this.router.navigate(['/recipes']);
  }
  onToShopList() {
    this.shoppingListService.addRecipeIng2(this.recipeToDisplay.ingredients);
    console.log(this.recipeToDisplay);
  }
}
