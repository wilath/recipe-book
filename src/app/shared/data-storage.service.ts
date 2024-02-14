import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { map, tap } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './models/ingredient.model';

@Injectable()
export class DataStoragaService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService
  ) {}

  private urlRecipes =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  private urlShoppingList =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/shoppinglist.json';

  public storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.urlRecipes, recipes).subscribe();
    const shoppinglist = this.shoppingListService.getShopList();
    this.http.put(this.urlShoppingList, shoppinglist).subscribe();
  }
  public fetchRecipes() {
    this.fetchShopList();
    return this.http.get<Recipe[]>(this.urlRecipes).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((response) => {
        this.recipesService.setRecepies(response);
      })
    );
  }
  public fetchShopList() {
    return this.http
      .get<Ingredient[]>(this.urlShoppingList)
      .pipe(
        map((ings) => {
          return ings.map((ings) => {
            return { ...ings };
          });
        }),

        tap((response) => {
          this.shoppingListService.setIngredients(response);
        })
      )
      .subscribe();
  }
}
