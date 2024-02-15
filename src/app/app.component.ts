import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthServcie } from './auth/auth-supp/auth.servcie';

import { DataStoragaService } from './shared/data-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthServcie,
    private responsive: BreakpointObserver,
    private dataStorageService: DataStoragaService
  ) {}

  public isLogged$: boolean = false;

  ngOnInit() {
    this.authService.autoLogin();
    this.authService.user.subscribe((user) => {
      user !== null ? (this.isLogged$ = true) : (this.isLogged$ = false);
      if(user){
        this.isLogged$ = true;
        this.dataStorageService.fetchUsersData()
      } else {
        this.isLogged$ = false
      }

    });

    this.responsive
      .observe(Breakpoints.HandsetLandscape)
      .subscribe((result) => {
        if (result.matches) {
          console.log('screens matches HandsetLandscape');
        }
      });
  }
}
