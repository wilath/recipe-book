import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthResponseData, AuthServcie } from './auth-supp/auth.servcie';
import { DataStoragaService } from '../shared/data-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public isLoginMode = true;
  public isLoading = false;
  public error: string = '';

  constructor(private authService: AuthServcie, private router: Router, private dts: DataStoragaService) {}

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    this.isLoading = true;

    let auth$: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      auth$ = this.authService.logIn(email, password);
    } else {
      auth$ = this.authService.signUp(email,name, password);
      this.storeNewUser()
    }

    auth$.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMsg) => {
        this.isLoading = false;
        this.error = errorMsg;
      }
    );

    form.reset();
  }

  public onHandleError() {
    this.error = '';
  }
  
  private storeNewUser(){
    this.authService.newUserRegistred$.pipe(take(1)).subscribe(()=>{
      this.dts.storeUsersData()
    })
  }
}
