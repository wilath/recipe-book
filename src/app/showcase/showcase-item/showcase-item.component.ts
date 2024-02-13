import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';
import { RecipesService } from '../../recipes/recipes.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-showcase-item',
  templateUrl: './showcase-item.component.html',
  styleUrl: '../showcase.component.scss',
})
export class ShowcaseItemComponent {
  constructor(private recipesService: RecipesService) {}

  @Input() public recipe!: Recipe;
  @Input() public index! : number;
  private user: User = JSON.parse(localStorage.getItem('userData') ||'{}')

  public get isLikedByCurrentUser(){
    return this.recipe.likes.whoLiked.includes(this.user.email)
  }

  public onLike() {
    this.recipesService.addLikeToRecipe(this.index, this.user.email )
  }

  public onFollowUser() {}

  public onOpenRecipe() {}

  public onAddToShoppingList() {}
}
