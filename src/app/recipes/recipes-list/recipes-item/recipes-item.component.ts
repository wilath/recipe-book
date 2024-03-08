import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipesService } from '../../recipes.service';
import { UserDataService } from '../../../user-panel/user-data.service';
import { User } from '../../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.scss'],
})

export class RecipesItemComponent implements OnChanges  {
  constructor(
    private recipesService: RecipesService,
    private usersDataServcie: UserDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  
  }
  
  @Input() public recipe!: Recipe;

  @Input() public index: number = 0;

  public isLikedByCurrentUser : boolean = false;

  public isFollowedByCurrentUser: boolean = false;

  public totalRatePercentage: number = 0
  
  public user!: User;

  public _rateByCurrentUser!: number;

  public get rateByCurrentUser(){
    return this._rateByCurrentUser
  }
  public set rateByCurrentUser(value:number){
    this.onRateRecipe(value)
    this._rateByCurrentUser = value;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.totalRatePercentage = (this.recipe.getAverageRating)*20;
    this.isLikedByCurrentUser = this.recipe.isLikedByUser(this.user.email);
    this.rateByCurrentUser = this.recipe.isRatedByUser(this.user.email);
    this.setFollow();
  }

  public onRateRecipe(value: number) {
    this.recipesService.addRateToRecipe(this.recipe.name, this.user.email,value);
    this.totalRatePercentage = (this.recipe.getAverageRating)*20;
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

 

  public onNavigateToRecipeDetails(){
    this.router.navigate([`${this.recipe.id}`],  {relativeTo: this.route})

  }

  private setFollow() {  
    if(this.usersDataServcie.getUserData(this.recipe.author)) {
       this.isFollowedByCurrentUser = this.usersDataServcie.getUserData(this.recipe.author).followers?.includes(this.user.email) || false}
    
  }
}




















