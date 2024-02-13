import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';
import { RecipesService } from '../../recipes/recipes.service';

@Component({
  selector: 'app-showcase-item',
  templateUrl: './showcase-item.component.html',
  styleUrl: '../showcase.component.scss',
})
export class ShowcaseItemComponent {
  @Input() public recipe!: Recipe;

  constructor(private recipesService: RecipesService) {}

  public onLike() {}

  public onFollowUser() {}

  public onOpenRecipe() {}

  public onAddToShoppingList() {}
}
