import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, empty, filter, map, of, switchMap, tap } from 'rxjs';
import { AuthServcie } from '../auth/auth-supp/auth.servcie';
import { RealTimeDatabaseService } from '../shared/real-time-database.service';
import { UserDataService } from '../user-panel/user-data.service';
import { UserData, emptyUserData } from '../shared/models/user-data.model';
import { NavigationEnd, Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.component.media.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(
    private userDataService: UserDataService,
    private realTimeDataBase: RealTimeDatabaseService,
    private authService: AuthServcie,
    private router: Router
  ) {}

  public isAuth = false;

  public isNotificationMenuShown = false;

  public usersData: UserData = emptyUserData;

  public notificationFilter : 'all' | 'new'  = 'new';

  public notificationFilterFire = false;

  private user$!: Subscription;

  private userData$ = this.userDataService.userDataChange;

  test(){
    console.log('user',this.usersData)
    console.log('auth', this.isAuth)
  }

  public ngOnInit() {
    this.userSubscription()
    this.navigationSubscription()
  }

  public ngOnDestroy() {
    this.user$.unsubscribe();
    this.userData$.unsubscribe();
  }

  public onLogout() {
    this.authService.logout();
  }

  public clearNotifications(index?: Date) {
    const newUserData = this.usersData;
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
          case currentUrl.includes('user-panel'):
        classToReturn = 'marker-shopping-list';
        break;
      default:
        classToReturn = 'marker-default';
    }

    return classToReturn
  }

  public getUnshownNotificationsCount(): number {
    if (!this.usersData || !this.usersData.notifications) {
      return 0;
    }
    return this.usersData.notifications.filter(el => !el.shown).length;
  }

  private navigationSubscription(){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.setMarkerClass();
    });
  }

  private userSubscription(){
  
    this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuth = true;
        this.userDataService.userDataChange.pipe(
          map((users) => users.find((el) => el.email === user.email)),).
          subscribe((userData) => {
          if (userData) {
            this.usersData = userData;
          }
        });
      } else {
        this.usersData = emptyUserData
        this.isAuth = false;
      }
    });

 
}
}
