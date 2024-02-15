import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './models/ingredient.model';
import { UserData } from './models/user-data.model';
import { UserDataService } from '../auth/auth-supp/user-data.service';
import { AuthServcie } from '../auth/auth-supp/auth.servcie';
import { Subscription } from 'rxjs';

@Injectable()
export class DataStoragaService implements OnInit, OnDestroy {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
    private userDataService: UserDataService
  ) {}

  private urlRecipes =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  private urlShoppingList =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/shoppinglist.json';
  private urlUsers =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/users.json';

  public ngOnInit(): void {
  
  }

  public ngOnDestroy(): void {
  
  }

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

  public fetchUsersData() {
    this.http
      .get<UserData[]>(this.urlUsers)
      .pipe(
        tap((res) => {
          this.userDataService.setUsersData(res);
        })
      )
      .subscribe();
  }

  public storeUsersData() {
    const usersData = this.userDataService.getUsersData();
    this.http.put(this.urlUsers, usersData).subscribe();
    console.log('stored');
  }
}
