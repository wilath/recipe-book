import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { FoodType } from '../shared/food-type-enum';


@Pipe({
  name: 'foodTypeSort'
})
export class FoodTypeSortPipe implements PipeTransform {
  transform(recipes: Recipe[], foodType: FoodType | null, foodSearch: string): Recipe[] {
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
    
    return recipesToReturn;
  }
}
