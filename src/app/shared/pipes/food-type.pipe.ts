import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { FoodType } from '../enums/food-type-enum';
import { FoodSort } from '../enums/food-sort.enum';


@Pipe({
  name: 'foodType'
})
export class FoodTypePipe implements PipeTransform {

  private loggedUserEmail = JSON.parse(localStorage.getItem('userData') || '{}').email;

  transform(recipes: Recipe[], foodType: FoodType | null, foodSearch: string, userSort: boolean ): Recipe[] {
    let recipesToReturn: Recipe[] = []
    if (!recipes || foodType === null) {
      recipesToReturn = recipes
    } else {
      recipesToReturn = recipes.filter(recipe => recipe.foodType === foodType);
    }
    if(foodSearch !== ''){
      recipesToReturn = recipesToReturn.filter(recipe => {
        return recipe.name.toLowerCase().includes(foodSearch.toLowerCase());
      })
    }
    if(userSort){
      recipesToReturn = recipesToReturn.filter(recipe => {
        return recipe.author === this.loggedUserEmail;
      })
    }
    return recipesToReturn;
  }
}


@Pipe({
  name: 'foodSort',
})
export class FoodSortPipe implements PipeTransform {

  transform(recipes: Recipe[], sortType: FoodSort ): Recipe[] {
    let recipesToReturn: Recipe[] = []

    switch (sortType) {
      case FoodSort.Latest:
        recipesToReturn = recipes.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
      case FoodSort.Popular:
        recipesToReturn = recipes.sort((a, b) => b.likes.quantity - a.likes.quantity);
        break;
      case FoodSort.BestRating:
        recipesToReturn = recipes.sort((a, b) => b.getAverageRating - a.getAverageRating);
        break;
      case FoodSort.Quickest:
        recipesToReturn =  recipes.sort((a, b) => a.prepTimeMinutes - b.prepTimeMinutes);
        break;
      default:
           recipesToReturn = recipesToReturn; 
  }
    
    return recipesToReturn;
  }
}

