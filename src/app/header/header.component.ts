import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, filter, switchMap, tap } from 'rxjs';
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

  public isNotificationMenuShown = false;

  public userData: UserData = {email: '', name: '', notifications: []}

  public notificationFilter : 'all' | 'new'  = 'new';

  public notificationFilterFire = false;

  private user$!: Subscription;

  private userData$ = this.userDataService.userDataChange;

  public ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.setMarkerClass();
    });

    this.user$ = this.authService.user.pipe(
        tap((user) => {
          if (user) {
            this.userData$.subscribe(users => {             
              this.userData = users.filter(el => el.email === user.email)[0]})                        
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

  public clearNotifications(index?: Date) {
    const newUserData = this.userData;
    if(index === undefined){
      for(let i = 0; i < newUserData.notifications.length ; i++){
        newUserData.notifications[i].shown = true;
      }
    } else {
      const notificationIndex = newUserData.notifications.findIndex( el=> el.date === index);
      newUserData.notifications[notificationIndex].shown = true;
    }
  this.userDataService.editUser(newUserData)
  this.notificationFilterFire = !this.notificationFilterFire
  this.notificationFilter = 'new'

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
