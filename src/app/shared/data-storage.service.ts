import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { map, tap } from 'rxjs/operators';
import { UserData } from './models/user-data.model';
import { UserDataService } from '../user-panel/user-data.service';
import { MicroblogService } from '../microblog/microblog.service';
import { MicroblogPost } from './models/microblog-post.model';


@Injectable()
export class DataStoragaService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private microblogService: MicroblogService,
    private userDataService: UserDataService
  ) {}

  private urlRecipes =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  private urlUsers =
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/users.json';
  private ulrMicroblog = 
    'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/microblog.json';

  public storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put(this.urlRecipes, recipes).subscribe();
  }

  public fetchRecipes() {
 
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

  public storeUsersData() {
    const usersData = this.userDataService.getUsersData();
    this.http.put(this.urlUsers, usersData).subscribe();
    
  }

  public fetchUsersData() {
    this.http
      .get<UserData[]>(this.urlUsers)
      .pipe(
        tap((res) => {
          if(res){
          this.userDataService.setUsersData(res);
          }
        })
      )
      .subscribe();
  }

  public storeMicroblogData() {

  }

  public fetchMicroblogData() {
    this.http
      .get<MicroblogPost[]>(this.ulrMicroblog)
      .pipe(
        tap((res) => {
          if(res){
          this.microblogService.setMicroblogData(res)
          }
        })
      )
      .subscribe();
  }

}
