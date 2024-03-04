import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipesService } from '../../recipes.service';
import { UserDataService } from '../../../user-panel/user-data.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss'],
})
export class RecipesItemComponent implements OnInit {
  constructor(
    private recipesService: RecipesService,
    private usersDataServcie: UserDataService
  ) {}

  @Input() public recipe!: Recipe;

  @Input() public index: number = 0;

  public isLikedByCurrentUser : boolean = false;

  public isFollowedByCurrentUser: boolean = false;

  public rateByCurrentUser: number = 0;

  public user!: User;

  public ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.isLikedByCurrentUser = this.recipe.isLikedByUser(this.user.email);
    this.rateByCurrentUser = this.recipe.isRatedByUser(this.user.email);
    this.setFollow()
  }

  public onLike() {
    this.recipesService.addLikeToRecipe(this.recipe.name,this.user.email, !this.isLikedByCurrentUser);
    this.isLikedByCurrentUser = !this.isLikedByCurrentUser
  }

  public onFollowUser() {
    this.usersDataServcie.addFollowToUser(this.recipe.author, this.user.email,  !this.isFollowedByCurrentUser);
    this.isFollowedByCurrentUser = !this.isFollowedByCurrentUser;
  }

  public onOpenRecipe() {
  }


  public onRateRecipe(event: Event) {
    const target = event.target as HTMLInputElement;
    const isRated = this.rateByCurrentUser === 0 ? false : true;
    this.recipesService.addRateToRecipe(this.recipe.name, this.user.email,parseInt(target.value,10), isRated);
   
  }

  private setFollow() {  
    if(this.usersDataServcie.getUserData(this.recipe.author)) {
       this.isFollowedByCurrentUser = this.usersDataServcie.getUserData(this.recipe.author).followers?.includes(this.user.email) || false}
    
  }
}




















