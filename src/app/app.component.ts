import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthServcie } from './auth/auth-supp/auth.servcie';
import { take } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private aService: AuthServcie,
    private responsive: BreakpointObserver,
    
  ) {}

  public isLogged$: boolean = false;

  ngOnInit() {
    this.aService.autoLogin();
    this.aService.user.subscribe((user) => {
      user !== null ? (this.isLogged$ = true) : (this.isLogged$ = false);

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
