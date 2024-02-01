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
  constructor(private aService: AuthServcie) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.aService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        } else {
          const modRequest = req.clone({
            params: new HttpParams().set('auth', user.token),
          });
          return next.handle(modRequest);
        }
      })
    );
  }
}
