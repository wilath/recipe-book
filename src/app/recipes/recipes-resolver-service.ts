import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RecipesService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService {
  constructor(private recipeService: RecipesService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.recipeService.setRecepies();
  }
}
