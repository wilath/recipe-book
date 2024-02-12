import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { FoodType } from '../shared/food-type-enum';


@Pipe({
  name: 'foodTypeSort'
})
export class FoodTypeSortPipe implements PipeTransform {
  transform(recipes: Recipe[], foodType: FoodType | null): Recipe[] {
    if (!recipes || foodType === null) {
      return recipes;
    }
  
    return recipes.filter(recipe => recipe.foodType === foodType);
  }
}
