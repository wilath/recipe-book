import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthServcie } from './auth/auth.servcie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private aService: AuthServcie, private responsive: BreakpointObserver) {}

  ngOnInit() {
    this.aService.autoLogin();

    this.responsive.observe(Breakpoints.HandsetLandscape)
    .subscribe(result => {

      if (result.matches) {
        console.log("screens matches HandsetLandscape");
      }

});
  }
}
