import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap, tap } from 'rxjs';
import { AuthServcie } from '../auth/auth-supp/auth.servcie';
import { DataStoragaService } from '../shared/data-storage.service';
import { UserDataService } from '../auth/auth-supp/user-data.service';
import { UserData } from '../shared/models/user-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.component.media.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private userDataService: UserDataService,
    private dataStorageService: DataStoragaService,
    private authService: AuthServcie,
    private router: Router
  ) {}

  public isAuth = false;

  private user$!: Subscription;

  private userData$ = this.userDataService.userDataChange;

  public userData: UserData | null = null;

  ngOnInit() {
    this.router.events.subscribe(() => {
      
      this.isRouteActive('/recipes') || this.isRouteActive('/shopping-list');
    });
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

  public isRouteActive(url: string): boolean {
    return this.router.url.includes(url);
  }
  private FetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
