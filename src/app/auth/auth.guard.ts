import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators'

import { AuthServcie } from "./auth.servcie";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private aService: AuthServcie, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.aService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user
                if (isAuth) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/auth'])
                }
            }))
    }

}
