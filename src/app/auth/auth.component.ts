import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, concatMap, of, switchMap, take, tap } from 'rxjs';
import { AuthResponseData, AuthServcie } from './auth-supp/auth.servcie';
import { UserDataService } from '../user-panel/user-data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  
  constructor(
    private authService: AuthServcie,
    private userDataService: UserDataService,
    private router: Router
  ) { 
    this._token = null
  }

  public isLoginMode = true;

  public isLoading = false;

  public error: string = '';

  private auth$!: Observable<AuthResponseData>;

  public _token: string | null;

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public captchaResolved(captchaResponse: string | null) {
    this._token = captchaResponse
  }

  public captchaError(captchaResponse: any) {
    console.log(captchaResponse)
  }


  public onSubmit(form: NgForm) {
    
    if(form.value.checkbox) {
      console.error('Anit-Bot detected')
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.auth$ = this.authService.logIn(email, password);
    } else {
      this.auth$ = this.authService.signUp(email, name, password);
    }

    this.auth$.subscribe({
      next: (resData) => {
        this.userDataService.setUsersData().pipe(
          switchMap(() => {
            if (name !== undefined) {
              return this.userDataService.addNewUser(resData.email, resData.localId, name);
            } else {
              return of(void 0);
            }
          }),
          tap(() => {
            this.isLoading = false;
            this.router.navigate(['/microblog']);
          })
        ).subscribe();
      },
      error: (errorMsg) => {
        this.isLoading = false;
        this.error = errorMsg;
      },

    });

    form.reset();
  }

  public onHandleError() {
    this.error = '';
  }
}
