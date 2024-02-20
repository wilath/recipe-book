import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStoragaService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService {
  constructor(private dataStorageService: DataStoragaService) {};

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
