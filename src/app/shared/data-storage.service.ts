import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipesService } from "../recipes/recipes.service";
import { map, tap } from 'rxjs/operators'
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";

@Injectable()
export class dataStoragaService {
    constructor(
        private http: HttpClient,
        private rService: RecipesService,
        private slService: ShoppingListService
    ) { }

    private urlRecipes = 'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    private urlShoppingList = 'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/shoppinglist.json'

    storeRecipes() {
        const recipes = this.rService.getRecipes();
        this.http.put(this.urlRecipes, recipes).subscribe(response => {
            console.log(response)
        });
        const shoppinglist = this.slService.getShopList();
        this.http.put(this.urlShoppingList, shoppinglist).subscribe(response => {
            console.log(response)
        });

    }
    fetchRecipes() {
        this.fetchShopList();
        return this.http
            .get<Recipe[]>(this.urlRecipes).pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    })
                }),
                tap(response => {
                    this.rService.setRecepies(response);
                    
                }))
    }
    fetchShopList() {
        return this.http
            .get<Ingredient[]>(this.urlShoppingList).pipe(
                map(ings => {
                    return ings.map(ings => {
                        return { ...ings }
                    })
                }),

                tap(response => {
                    this.slService.setIngredients(response)
                    
                })).subscribe()
    }
}