import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDataService } from './user-data.service';

@Injectable({ providedIn: 'root' })
export class UserDataResolverService {
  constructor(private userDataService: UserDataService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userDataService.setUsersData();
  }
}
