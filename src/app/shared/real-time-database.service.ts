import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { map, tap } from 'rxjs/operators';
import { UserData } from './models/user-data.model';
import { MicroblogPost } from './models/microblog-post.model';
import { Observable } from 'rxjs';

@Injectable()
export class RealTimeDatabaseService {
  constructor(private http: HttpClient) {}

  private urlRecipes =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  private urlUsers =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/users.json';
  private ulrMicroblog =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/microblog.json';

  public storeRecipes(recipes : Recipe[]) {
    this.http.put(this.urlRecipes, recipes).subscribe();
  }

  public fetchRecipes(): Observable<Recipe[]> {

    return this.http.get<Recipe[]>(this.urlRecipes).pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return new Recipe(
              recipe.id,
              recipe.name,
              recipe.description.steps ? recipe.description : {main:recipe.description.main, steps: []},
              recipe.images ? recipe.images : [],
              recipe.ingredients ? recipe.ingredients : [],
              recipe.foodType,
              recipe.author,
              recipe.level,
              recipe.prepTimeMinutes,
              recipe.date,
              recipe.likes.whoLiked ? recipe.likes : { quantity: recipe.likes.quantity? recipe.likes.quantity : 0, whoLiked: [] },
              recipe.stars ? recipe.stars : []
          );
          })
        })
      )
  }

  public storeUsersData(usersData: UserData[]) {
    this.http.put(this.urlUsers, usersData).subscribe();
  }

  public fetchUsersData(): Observable<UserData[]> {

    return this.http.get<UserData[]>(this.urlUsers).pipe(
      map((users) => {
        return users.map((user) => {
          return {
            ...user,
            notifications: user.notifications ? user.notifications : [],
            userFollows: user.userFollows ? user.userFollows : [],
            followers: user.followers ? user.followers : []
          }
        })
      })
    )
  }

  public storeMicroblogData(microblog: MicroblogPost[]) {
    this.http.put(this.ulrMicroblog, microblog).subscribe();
  }

  public fetchMicroblogData(): Observable<MicroblogPost[]> {
    return this.http.get<MicroblogPost[]>(this.ulrMicroblog)
  }

}
