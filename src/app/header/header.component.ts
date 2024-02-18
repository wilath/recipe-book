import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter, switchMap, tap } from 'rxjs';
import { AuthServcie } from '../auth/auth-supp/auth.servcie';
import { DataStoragaService } from '../shared/data-storage.service';
import { UserDataService } from '../auth/auth-supp/user-data.service';
import { UserData } from '../shared/models/user-data.model';
import { NavigationEnd, Router } from '@angular/router';

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

  public userData: UserData | null = null;

  public notificationFilter: 'all' | 'new' = 'new';

  private user$!: Subscription;

  private userData$ = this.userDataService.userDataChange;

  public ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      
      this.setMarkerClass();
    });

    this.user$ = this.authService.user.pipe(
        tap((user) => {
          if (user) {
            this.userData$.subscribe(users => this.userData = users.filter(el => el.email === user.email)[0])
          }
        }))
        .subscribe((user) => {
          this.isAuth = !user ? false : true;
          if (this.isAuth) {
            this.FetchData();
           }
      });
  }

  public ngOnDestroy() {
    this.user$.unsubscribe();
    this.userData$.unsubscribe();
  }

  public onLogout() {
    this.authService.logout();
  }

  public clearNotifications(index: number) {
    if(index < 0){
      console.log('all')
    } else {
      console.log(index)

    }
    
    }

  public setMarkerClass(): string {
    const currentUrl = this.router.url
    let classToReturn = ''
    
    switch (true) {
      case currentUrl.includes('microblog'):
        classToReturn = 'marker-microblog';
        break;
      case currentUrl.includes('recipes'):
        classToReturn = 'marker-recipes';
        break;
      case currentUrl.includes('shopping-list'):
        classToReturn = 'marker-shopping-list';
        break;
      default:
        classToReturn = 'marker-default';
    }

    return classToReturn
  }

  public getUnshownNotificationsCount(): number {
    if (!this.userData || !this.userData.notifications) {
      return 0;
    }
    return this.userData.notifications.filter(el => !el.shown).length;
  }

  private FetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
