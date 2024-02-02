import { Component, OnInit } from '@angular/core';

import { AuthServcie } from './auth/auth.servcie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private aService: AuthServcie) {}

  ngOnInit() {
    this.aService.autoLogin();
  }
}
