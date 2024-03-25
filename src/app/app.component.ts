import { Component, OnInit } from '@angular/core';

import { AuthServcie } from './auth/auth-supp/auth.servcie';

import { RealTimeDatabaseService } from './shared/real-time-database.service';
import { UserDataService } from './user-panel/user-data.service';
import { RecipesService } from './recipes/recipes.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthServcie,
    private userDataService: UserDataService
  ) {}


  public isLogged$: boolean = false;

  public ngOnInit() {
    this.authService.autoLogin();
    this.authService.user.subscribe((user) => {
      user !== null ? (this.isLogged$ = true) : (this.isLogged$ = false);
      if (user) {
        this.isLogged$ = true;
      } else {
        this.isLogged$ = false;
      }
    });
  }
  

}
