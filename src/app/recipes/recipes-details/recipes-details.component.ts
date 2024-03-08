import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipesService } from '../recipes.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { UserData } from '../../shared/models/user-data.model';
import { UserDataService } from '../../user-panel/user-data.service';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.scss'],
})
export class RecipesDetailsComponent implements OnInit {
  constructor(
    private recipesService: RecipesService,
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public id: number = 0;

  public recipe!: Recipe;

  public userData!: UserData;

  public totalRatePercentage: number = 0;

  public isLikedByCurrentUser: boolean = false;

  public isFollowedByCurrentUser: boolean = false;

  public _rateByCurrentUser: number = 0;

  public get rateByCurrentUser() {
    return this._rateByCurrentUser;
  }
  public set rateByCurrentUser(value: number) {
    this.onRateRecipe(value);
    this._rateByCurrentUser = value;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
    this.userData = this.userDataService.getUserData(
      JSON.parse(localStorage.getItem('userData') || '{}').email
    );
    this.isLikedByCurrentUser = this.recipe.isLikedByUser(this.userData.email);
    this._rateByCurrentUser = this.recipe.isRatedByUser(this.userData.email);
    this.totalRatePercentage = this.recipe.getAverageRating * 20;
    this.setFollow();
  }

  public onRateRecipe(value: number) {
    this.recipesService.addRateToRecipe(
      this.recipe.name,
      this.userData.email,
      value
    );
    this.totalRatePercentage = this.recipe.getAverageRating * 20;
  }

  public onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteRecipe() {
    this.recipesService.deleteRecepie(this.id);
    this.router.navigate(['/recipes']);
  }
  public onToShopList() {}

  public onGoBack() {}

  private setFollow() {
    if (this.userDataService.getUserData(this.recipe.author)) {
      this.isFollowedByCurrentUser =
        this.userDataService
          .getUserData(this.recipe.author)
          .followers?.includes(this.userData.email) || false;
    }
  }
}
