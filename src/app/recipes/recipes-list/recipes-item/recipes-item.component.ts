import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn } from '../../../shared/animations/fade-in.animation';
import { slideIn } from '../../../shared/animations/slide-in.animation';
import { Recipe } from '../../../shared/models/recipe.model';
import { UserData, emptyUserData } from '../../../shared/models/user-data.model';
import { User } from '../../../shared/models/user.model';
import { UserDataService } from '../../../user-panel/user-data.service';
import { RecipesService } from '../../recipes.service';



@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss'],
  animations: [
    fadeIn,
    slideIn
  ]
})

export class RecipesItemComponent implements OnChanges  {
  constructor(
    private recipesService: RecipesService,
    private usersDataServcie: UserDataService,
    private router: Router,
  ) {
  
  }
  
  @Input() public recipe!: Recipe;

  @Input() public isSimpleDisplay: boolean = false;

  public recipeAuthorData: UserData = emptyUserData

  public isLikedByCurrentUser : boolean = false;

  public isFollowedByCurrentUser: boolean = false;

  public totalRatePercentage: number = 0
  
  public currentUser!: User;

  public _rateByCurrentUser!: number;

  public get rateByCurrentUser(){
    return this._rateByCurrentUser
  }
  public set rateByCurrentUser(value:number){
    this.onRateRecipe(value)
    this._rateByCurrentUser = value;
  }

  public ngOnChanges(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userData') || '{}');
    this.totalRatePercentage = (this.recipe.getAverageRating)*20;
    this.isLikedByCurrentUser = this.recipe.isLikedByUser(this.currentUser.email);
    this._rateByCurrentUser = this.recipe.isRatedByUser(this.currentUser.email);
    this.recipeAuthorData = this.usersDataServcie.getUserDataByEmail(this.recipe.author)
    this.setFollow();
  }

  public onRateRecipe(value: number) {
    this.recipesService.addRateToRecipe(this.recipe.name, this.currentUser.email,value);
    this.totalRatePercentage = (this.recipe.getAverageRating)*20;
  }
 

  public onLike() {
    this.recipesService.addLikeToRecipe(this.recipe.name,this.currentUser.email, !this.isLikedByCurrentUser);
    this.isLikedByCurrentUser = !this.isLikedByCurrentUser
  }

  public onFollowUser() {
    this.usersDataServcie.addFollowToUser(this.recipe.author, this.currentUser.email,  !this.isFollowedByCurrentUser);
    this.isFollowedByCurrentUser = !this.isFollowedByCurrentUser;
  }

  public onNavigateToRecipeDetails(){
    this.router.navigate([`recipes/${this.recipe.id}`])

  }

  private setFollow() {  
    if(this.usersDataServcie.getUserDataByEmail(this.recipe.author)) {
       this.isFollowedByCurrentUser = this.usersDataServcie.getUserDataByEmail(this.recipe.author).followers?.includes(this.currentUser.email) || false}
    
  }
}




















