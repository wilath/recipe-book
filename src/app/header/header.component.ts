import {Component, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { AuthServcie } from '../auth/auth-supp/auth.servcie';
import { UserData, emptyUserData } from '../shared/models/user-data.model';
import { UserDataService } from '../user-panel/user-data.service';
import { slideIn } from '../shared/animations/slide-in.animation';
import { fadeIn } from '../shared/animations/fade-in.animation';
import { NotificationModel } from '../shared/models/notification.model';

export enum NotifactionFilterEnum{
  all,
  new
}

@Component({
  host: {
    '(document:click)': 'onClickOutsideNotificationMenu($event)',
  },
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.component.media.scss'],
  animations: [
    slideIn,
    fadeIn
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private userDataService: UserDataService,
    private authService: AuthServcie,
    private router: Router
  ) {}
  

  @ViewChildren('notiMenu') notiMenu!: QueryList<ElementRef>;

  public isAuth = false;

  public isNotificationMenuShown = false;

  public usersData: UserData = emptyUserData;

  public notificationFilterEnum = NotifactionFilterEnum;

  public notifiactionsToDisplay: NotificationModel[] = [];

  public notificationFilter: NotifactionFilterEnum = NotifactionFilterEnum.new

  private user$!: Subscription;

  private userData$ = this.userDataService.userDataChange;

  public ngOnInit() {
    this.userSubscription();
    this.navigationSubscription();
  }

  public ngOnDestroy() {
    this.user$.unsubscribe();
    this.userData$.unsubscribe();
  }

  public onLogout() {
    this.isNotificationMenuShown = false;
    this.authService.logout();
  }

  public clearNotifications(index?: Date) {
    const newUserData = this.usersData;
    if (index === undefined) {
      newUserData.notifications = [];
    } else {
      const notificationIndex = newUserData.notifications.findIndex(
        (el) => el.date === index
      );
      newUserData.notifications.splice(notificationIndex, 1);
    }
    this.userDataService.editUser(newUserData);
    this.setNotificationsToDisplay()
  }

  public setMarkerClass(): string {
    const currentUrl = this.router.url;
    let classToReturn = '';

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

    return classToReturn;
  }

  public getNotificationsCount(): number {
    return this.usersData.notifications.length;
  }

  private navigationSubscription() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setMarkerClass();
      });
  }

  private userSubscription() {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuth = true;
        this.userDataService.userDataChange
          .pipe(map((users) => users.find((el) => el.email === user.email)))
          .subscribe((userData) => {
            if (userData) {
              this.usersData = userData;
              this.notifiactionsToDisplay = [...userData.notifications].slice(0,10)
            }
          });
      } else {
        this.usersData = emptyUserData;
        this.isAuth = false;
      }
    });
  }

  private onClickOutsideNotificationMenu(event: Event) {
    if (this.isNotificationMenuShown && this.notiMenu.length === 2) {
      const firstMenu = this.notiMenu.first.nativeElement;
      const secondMenu = this.notiMenu.last.nativeElement;

      if (
        !firstMenu.contains(event.target) &&
        !secondMenu.contains(event.target)
      ) {
        this.isNotificationMenuShown = false;
      }
    }
  }

  private setNotificationsToDisplay(){
    this.notifiactionsToDisplay = this.usersData.notifications.slice(0,10)
  }

}
