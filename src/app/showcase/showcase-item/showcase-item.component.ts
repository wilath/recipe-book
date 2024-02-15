import { Component, Input } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipesService } from '../../recipes/recipes.service';
import { User } from '../../shared/models/user.model';
import { UserDataService } from '../../auth/auth-supp/user-data.service';

@Component({
  selector: 'app-showcase-item',
  templateUrl: './showcase-item.component.html',
  styleUrl: '../showcase.component.scss',
})
export class ShowcaseItemComponent {
  constructor(
    private recipesService: RecipesService,
    private usersDataServcie: UserDataService
  ) {}

  @Input() public recipe!: Recipe;

  private user: User = JSON.parse(localStorage.getItem('userData') || '{}');

  public get isLikedByCurrentUser() {
    return this.recipe.likes.whoLiked.includes(this.user.email);
  }

  public get isFollowedByCurrentUser() {
    return this.usersDataServcie
      .getUserData(this.recipe.author)
      .followers?.includes(this.user.email);
  }

  public onLike() {
    this.recipesService.addLikeToRecipe(
      this.recipe.name,
      this.user.email,
      !this.isLikedByCurrentUser
    );
  }

  public onFollowUser() {}

  public onOpenRecipe() {}

  public onAddToShoppingList() {}
}
