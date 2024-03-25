import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthServcie } from './auth.servcie';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthServcie) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        } else {
          const modRequest = req.clone({
            params: new HttpParams().set('auth', user.token as string),
          });
          return next.handle(modRequest);
        }
      })
    );
  }
}
