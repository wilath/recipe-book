import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from '../user-panel/user-data.service';
import { AuthResponseData, AuthServcie } from './auth-supp/auth.servcie';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        if(name){
          this.userDataService.setNewUserToAdd({email: resData.email, id: resData.localId, name: name})
        }
      },
      complete:( () => {
        this.isLoading = false;
        this.router.navigate(['/microblog']);

      }),
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
