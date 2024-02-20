import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserDataService } from './user-data.service';
import { ReplaySubject, first } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserDataResolverService {
  constructor(private userDataService: UserDataService) {}

  requested = false;
  subject = new ReplaySubject<void>();

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.requested) {
      this.requested = true;

      this.userDataService
        .setUsersData()
        .subscribe((nr) => this.subject.next(nr));
    }

    return this.subject.pipe(first());
  }
}
