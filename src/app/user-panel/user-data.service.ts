import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap } from 'rxjs';
import { UserNotification } from '../shared/enums/notifications.enum';
import { NotificationModel } from '../shared/models/notification.model';
import { ShoppingItem, SimpleUserdata, UserData, emptyUserData } from '../shared/models/user-data.model';
import { RealTimeDatabaseService } from '../shared/real-time-database.service';

@Injectable()
export class UserDataService {
  constructor(private realTimeDatabaseService: RealTimeDatabaseService) {}

  public usersData: UserData[] = [];

  public userDataChange = new Subject<UserData[]>();

  public newUserToAdd: SimpleUserdata | null = null;

  public setUsersData(): Observable<void> {
    
    return this.realTimeDatabaseService.fetchUsersData().pipe(
      tap((usersToSet: UserData[]) => {
        if(usersToSet){
          
          if(this.newUserToAdd) { 
            usersToSet.push({
              ...this.newUserToAdd,
              notifications: [{message:`Welcome ${this.newUserToAdd.name} I hope you will enjoy this site!`,shown: false, date: new Date()}],
              shoppingList: [],
              followers: [],
              userFollows: [],
            });
            this.realTimeDatabaseService.storeUsersData(usersToSet);
            this.newUserToAdd = null;
          } 
            this.usersData = usersToSet;
            this.userDataChange.next(this.usersData.slice());
          }
        }
      ),map(()=>{}))
  }

  public setNewUserToAdd(user: SimpleUserdata): void {
    this.newUserToAdd = user
  }

  public getUsersData(): UserData[] {
    return this.usersData.slice();
  }

  public getUserDataByEmail(email: string): UserData {
    const index = this.usersData.findIndex((user) => user.email === email);
    return this.usersData[index];
  }

  public getUserDataById(id: string): UserData {
    const index = this.usersData.findIndex((user) => user.id === id);
    return this.usersData[index];
  }

  public addFollowToUser(userEmail: string,followerEmail: string, add: boolean) {
    const data: UserData[] = this.usersData;

    const follower = this.getUserByEmail(followerEmail);
    const user = this.getUserByEmail(userEmail);
    if (add) {
      if (!user.user.followers) {
        user.user.followers = [];
      }
      if (!follower.user.userFollows) {
        follower.user.userFollows = [];
      }
      user.user.followers.push(followerEmail);
      follower.user.userFollows.push(userEmail);
      data[user.index] = user.user;
      data[follower.index] = follower.user;
      this.setNotificationToUser(user.user.email,UserNotification.gotFollowed,follower.user.email)
    } else if (user.user.followers && follower.user.userFollows) {
      user.user.followers.splice(user.user.followers?.indexOf(followerEmail),1);
      follower.user.userFollows.splice(follower.user.userFollows.indexOf(userEmail), 1);
      data[user.index] = user.user;
      data[follower.index] = follower.user;
      this.setNotificationToUser(user.user.email,UserNotification.gotUnfollowed,follower.user.email)

    }
  }

  public editUser(editedUser: UserData) {
    const data: UserData[] = this.usersData;
    const user = this.getUserByEmail(editedUser.email);
    data[user.index] = editedUser;
    this.usersData = data;
    this.userDataChange.next(this.usersData.slice());
    this.realTimeDatabaseService.storeUsersData(this.usersData)

  }

  public setNotificationToUser(userToNotifiy: string, notification: UserNotification,eventUserEmail: string, recipeName?: string, eventData?: string) {
    const message = this.getNotificationMessage(notification, eventUserEmail, recipeName, eventData);
    const user = this.getUserByEmail(userToNotifiy);
    const eventUser = this.getUserByEmail(eventUserEmail);
    const data: UserData[] = this.usersData;
    if (!user.user.notifications) {
      user.user.notifications = [];
    }
    if (notification === UserNotification.newUserJoined && userToNotifiy === eventUserEmail) {
      console.log('canceled for: ', userToNotifiy)
       return;
    }

   
    
    const newNotification: NotificationModel = {message: message, date: new Date(),shown: false, eventUserAvatar: eventUser.user.avatar};
    user.user.notifications.push(newNotification);
    data[user.index] = user.user;
    this.usersData = data;
    this.userDataChange.next(this.usersData.slice())
    this.realTimeDatabaseService.storeUsersData(this.usersData)

  }

  private getNotificationMessage(notification: UserNotification, eventUserEmail: string, eventName?: string, eventData?: string) {
    const user = this.getUserByEmail(eventUserEmail);
    let message = '';

    switch (notification) {
      case UserNotification.welcome:
        message = `Welcome ${user.user.name} I hope you will enjoy this site!`;
        break;
      case UserNotification.recipeLiked:
        message = `${user.user.name} liked your recipe - ${eventName}`;
        break;
      case UserNotification.recipeRated:
        message = `${user.user.name} rated your recipe - ${eventName} at ${eventData} stars!`;
        break;
      case UserNotification.gotFollowed:
        message = `${user.user.name} is now following You`;
        break;
      case UserNotification.gotUnfollowed:
        message = `${user.user.name} stopped following You`;
        break;
      case UserNotification.newRecipeByFollow:
        message = `${user.user.name} added new Recipe - ${eventName}`;
        break;
      case UserNotification.newUserJoined:
        message = `${user.user.name} joined the Page!`;
        break;
      case UserNotification.likedPost:
        message = `${user.user.name} liked your post` ;
        break;
      case UserNotification.likedComment:
        message = `${user.user.name} liked your comment`;
        break;
      case UserNotification.commentedPost:
        message = `${user.user.name} commented your post `;
        break;
      case UserNotification.commentRecipe:
        message = `${user.user.name} commented your recipe ${eventName}`
        break;
      case UserNotification.newPostByFollow:
        message = `${user.user.name} added new post `;
        break;
      case UserNotification.addToShopList:
        message = `${user.user.name} added your recipe to his shopping list`
        break;
    }
    return message;
  }

  public checkIfUserisFollowed(userEmailToCheck: string, followerEmail: string): boolean{
    const user = this.usersData.find((user) => user.email === userEmailToCheck) || emptyUserData
    return user.followers.includes(followerEmail)
  }

  public addRecipeToShopList(userEmail:string, shopItem: ShoppingItem) {
    const data: UserData[] = this.usersData;
    const user = this.getUserByEmail(userEmail);
    const existingItemIndex = data[user.index].shoppingList.findIndex(item => item.recipeId === shopItem.recipeId);

    if (existingItemIndex === -1) {
      data[user.index].shoppingList.push(shopItem);
      this.usersData = data;
      this.userDataChange.next(this.usersData.slice());
    }
    this.realTimeDatabaseService.storeUsersData(this.usersData)
    
  }

  public clearShopList(userEmail: string) {
    const data: UserData[] = this.usersData;
    const user = this.getUserByEmail(userEmail);
    data[user.index].shoppingList = []
    this.usersData = data;
    this.userDataChange.next(this.usersData.slice())
    this.realTimeDatabaseService.storeUsersData(this.usersData)
  }

  public deleteItemFromShopList(userEmail:string, shopItemId: number, index?: number) {
    const data: UserData[] = this.usersData;
    const user = this.getUserByEmail(userEmail);
    const shopIndex = data[user.index].shoppingList.findIndex(item => item.recipeId === shopItemId)

    if(index === undefined) {
      data[user.index].shoppingList.splice(shopIndex, 1)
    } else {
      data[user.index].shoppingList[shopIndex].ingredients.splice(index, 1);

      if (data[user.index].shoppingList[shopIndex].ingredients.length === 0) {
        data[user.index].shoppingList.splice(shopIndex, 1); 
      }
    }
    this.usersData = data;
    this.userDataChange.next(this.usersData.slice())
    this.realTimeDatabaseService.storeUsersData(this.usersData)

  }

  private getUserByEmail(email: string) {
    const data: UserData[] = this.usersData;
    const index = data.findIndex((user) => user.email === email);
    return { user: data[index], index: index };
  }

  private storeData(){
    this.realTimeDatabaseService.storeUsersData(this.usersData)
    }
}
