import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthServcie {

  public user = new BehaviorSubject<User | null>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private route: Router,
  ) {}
 
  public logout() {
    this.user.next(null);
    this.route.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  public autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  public autoLogin() {
    const userData: {
      email: string;
      id: string;
      name: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    } else {
      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  public signUp(email: string, name: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseConfig.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(resData.email,resData.localId,resData.idToken, +resData.expiresIn);
        })
      );
  }

  public logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseConfig.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
   
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 3600);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError( () => new Error (errorMsg));
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMsg = 'Account with this email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMsg = 'Account with this email doesnt exist';
          break;
        case 'INVALID_PASSWORD':
          errorMsg = 'Invalid password!';
          break;
        case 'USER_DISABLED':
          errorMsg = 'User was disabled by administrator!';
          break;
        case 'INVALID_EMAIL':
          errorMsg = 'Invalid Email!';
          break;
      }
    }
    return throwError( () => new Error (errorMsg));
  }
}
