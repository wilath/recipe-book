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

export class RecipesItemComponent implements OnChanges {
  constructor(
    private recipesService: RecipesService,
    private usersDataServcie: UserDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  
  @Input() public recipe!: Recipe;

  @Input() public index: number = 0;

  public isLikedByCurrentUser : boolean = false;

  public isFollowedByCurrentUser: boolean = false;

  public rateByCurrentUser: string = "0";

  public totalRatePercentage: number = 0

  public user!: User;

  public ngOnChanges(changes: SimpleChanges): void {
    this.user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.totalRatePercentage = (this.recipe.getAverageRating)*20;
    this.isLikedByCurrentUser = this.recipe.isLikedByUser(this.user.email);
    this.rateByCurrentUser = this.recipe.isRatedByUser(this.user.email).toString();
    this.setFollow();
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
    this.recipesService.addRateToRecipe(this.recipe.name, this.user.email,parseInt(target.value,10));
    this.totalRatePercentage = (this.recipe.getAverageRating)*20;
  }

  public onNavigateToRecipeDetails(){
    this.router.navigate([`${this.recipe.id}`],  {relativeTo: this.route})

  }

  private setFollow() {  
    if(this.usersDataServcie.getUserData(this.recipe.author)) {
       this.isFollowedByCurrentUser = this.usersDataServcie.getUserData(this.recipe.author).followers?.includes(this.user.email) || false}
    
  }
}




















