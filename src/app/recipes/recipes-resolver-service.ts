import { Injectable } from '@angular/core';
import { RecipesService } from './recipes.service';
import { ReplaySubject, first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService {
  constructor(private recipeService: RecipesService) {}

  requested = false;
  subject = new ReplaySubject<void>();

  resolve() {
    if (!this.requested) {
      this.requested = true;

      this.recipeService.setRecepies().subscribe((nr) => this.subject.next(nr));
    }

    return this.subject.pipe(first());
  }
}
