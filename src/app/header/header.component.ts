import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { AuthServcie } from '../auth/auth-supp/auth.servcie';
import { DataStoragaService } from '../shared/data-storage.service';
import { UserDataService } from '../auth/auth-supp/user-data.service';
import { UserData } from '../shared/models/user-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.component.media.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private userDataService: UserDataService,
    private dataStorageService: DataStoragaService,
    private authService: AuthServcie
  ) {}

  public isAuth = false;

  private user$!: Subscription;

  private userData$ = this.userDataService.userDataChange;

  public userData: UserData | null = null;

  ngOnInit() {
    this.user$ = this.authService.user
      .pipe(
        tap((user) => {
          if (user) {
            this.userData$.subscribe(users => this.userData = users.filter(el => el.email === user.email)[0])
          }
        })
      )
      .subscribe((user) => {
        this.isAuth = !user ? false : true;
        if (this.isAuth) {
          this.FetchData();
        }
      });
  }
  ngOnDestroy() {
    this.user$.unsubscribe();
    this.userData$.unsubscribe();
  }

  public onLogout() {
    this.authService.logout();
  }

  private FetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
