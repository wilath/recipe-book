import { Component, OnInit } from '@angular/core';

import { AuthServcie } from './auth/auth-supp/auth.servcie';

import { DataStoragaService } from './shared/data-storage.service';
import { UserDataService } from './user-panel/user-data.service';
import { RecipesService } from './recipes/recipes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthServcie,
    private dataStorageService: DataStoragaService,
    private userDataService: UserDataService,
    private recipesService: RecipesService

  ) {}


  public isLogged$: boolean = false;

  public usersDataChange = this.userDataService.sendDataToStore.subscribe(()=>{
    this.dataStorageService.storeUsersData()
  })
  public recipesDataChange = this.recipesService.storeRecipesData.subscribe(()=>{
    this.dataStorageService.storeRecipes()
  })

  
  public ngOnInit() {
    this.authService.autoLogin();
    this.authService.user.subscribe((user) => {
      user !== null ? (this.isLogged$ = true) : (this.isLogged$ = false);
      if (user) {
        this.isLogged$ = true;
        this.dataStorageService.fetchUsersData();
      } else {
        this.isLogged$ = false;
      }
    });
  }
  

}
