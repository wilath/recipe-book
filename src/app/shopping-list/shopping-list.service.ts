import { Ingredient } from '../shared/models/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {
  ingChganged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Array<Ingredient> = [];

  getShopList() {
    return this.ingredients.slice();
  }
  addingredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingChganged.next(this.ingredients.slice());
    console.log(this.ingredients);
  }
  addRecipeIng2(flyIn: Ingredient[]) {
    this.ingredients.push(...flyIn);
    this.ingChganged.next(this.ingredients.slice());
    console.log(this.ingredients);
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  updateIngredient(index: number, newIng: Ingredient) {
    this.ingredients[index] = newIng;
    this.ingChganged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingChganged.next(this.ingredients.slice());
  }

  setIngredients(shoplist: Ingredient[]) {
    this.ingredients = shoplist;
    this.ingChganged.next(this.ingredients.slice());
  }

  //fix mergaAlike
 /* mergeAlike() {
    let ings = this.ingredients;
    let result: Ingredient[] = [];

   
    this.ingredients = result;
    this.ingChganged.next(this.ingredients.slice());
  }*/
  deleteAll() {
    this.ingredients = [];
    this.ingChganged.next(this.ingredients.slice());
  }
}
