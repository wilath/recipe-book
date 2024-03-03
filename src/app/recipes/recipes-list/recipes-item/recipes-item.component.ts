import { Component, Input } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipesService } from '../../recipes.service';
import { UserDataService } from '../../../user-panel/user-data.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss'],
})
export class RecipesItemComponent {
  constructor(
    private recipesService: RecipesService,
    private usersDataServcie: UserDataService
  ) {}

  @Input() public  recipe!: Recipe;

  @Input() public  index: number = 0;

  private user: User = JSON.parse(localStorage.getItem('userData') || '{}');

  public get isLikedByCurrentUser() {
    let toReturn:boolean = false;
    if(this.recipe.likes.whoLiked) {
       toReturn = this.recipe.likes.whoLiked.includes(this.user.email)}
    return toReturn;
  }

  public get isUserAuthorOfRecipe() {
    return this.recipe.author === this.user.email
  }

  public get isFollowedByCurrentUser() {  
    let toReturn:boolean = false;
    if(this.usersDataServcie.getUserData(this.recipe.author)) {
       toReturn = this.usersDataServcie.getUserData(this.recipe.author).followers?.includes(this.user.email) || false}
    return toReturn;
  }

  public onLike() {
    this.recipesService.addLikeToRecipe(this.recipe.name,this.user.email, !this.isLikedByCurrentUser);
  }

  public onFollowUser() {
    this.usersDataServcie.addFollowToUser(this.recipe.author, this.user.email,  !this.isFollowedByCurrentUser)

  }

  public onOpenRecipe() {
  }

  public onAddToShoppingList() {
  }
}




















