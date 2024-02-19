import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserData } from '../../shared/models/user-data.model';
import { UserNotification } from '../../shared/enums/notifications.enum';
import { NotificationModel } from '../../shared/models/notification.model';

@Injectable()
export class UserDataService {
  constructor() {}

  public usersData: UserData[] = [];

  public userDataChange = new Subject<UserData[]>();

  public sendDataToStore = new Subject<void>();

  public setUsersData(users: UserData[]) {
    const usersToSet = users.map( (el) => {
      if(!el.notifications){el.notifications = []} 
      return el
    })
    this.usersData = usersToSet;
    this.userDataChange.next(this.usersData.slice());
  }

  public getUsersData() {
    return this.usersData.slice();
  }

  public getUserData(email: string) {
    const index = this.usersData.findIndex((user) => user.email === email);
    return this.usersData[index];
  }

  public addNewUser(email: string, name: string) {
    const data = this.usersData
    const newUserData: UserData = {
      email: email,
      name: name,
      notifications: [{message:`Welcome ${name} I hope you will enjoy this site!`,shown: false, date: new Date()}]
    };
    data.push(newUserData);
    this.usersData = data;
    this.userDataChange.next(this.usersData.slice());
    this.sendDataToStore.next()
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
    this.sendDataToStore.next()
  }

  public editUser(editedUser: UserData) {
    const data: UserData[] = this.usersData;
    const user = this.getUserByEmail(editedUser.email);
    data[user.index] = editedUser;
    this.usersData = data;
    this.userDataChange.next(this.usersData.slice());
  }

  public setNotificationToUser(userToNotifiy: string, notification: UserNotification,eventUserEmail: string, recipeName?: string) {
    const message = this.getNotification(notification, eventUserEmail, recipeName);
    const user = this.getUserByEmail(userToNotifiy);
    const eventUser = this.getUserByEmail(eventUserEmail);
    const data: UserData[] = this.usersData;
    if (!user.user.notifications) {
      user.user.notifications = [];
    }
    const newNotification: NotificationModel = {message: message, date: new Date(),shown: false, eventUser: eventUser.user.email}
    user.user.notifications.push(newNotification);
    data[user.index] = user.user;
    this.usersData = data;
    this.userDataChange.next(this.usersData.slice())
    this.sendDataToStore.next()
  }

  private getNotification(notification: UserNotification,eventUserEmail: string,eventName?: string) {
    const user = this.getUserByEmail(eventUserEmail);
    let message = '';

    switch (notification) {
      case UserNotification.welcome:
        message = `Welcome ${user.user.name} I hope you will enjoy this site!`;
        break;
      case UserNotification.recipeLiked:
        message = `${user.user.name} liked your recipe - ${eventName}`;
        break;
      case UserNotification.gotFollowed:
        message = `${user.user.name} is now following You`;
        break;
      case UserNotification.newRecipeByFollow:
        message = `${user.user.name} added new Recipe - ${eventName}`;
        break;
      case UserNotification.newUserJoined:
        message = `${user.user.name} joined the Page!`;
        break;
      case UserNotification.likedPost:
        message = `${user.user.name} liked your post - ${eventName}`;
        break;
      case UserNotification.commentedPost:
        message = `${user.user.name} commented your post - ${eventName}`;
        break;
      case UserNotification.newPostByFollow:
        message = `${user.user.name} added new post - ${eventName}`;
        break;
    }
    return message;
  }

  private getUserByEmail(email: string) {
    const data: UserData[] = this.usersData;
    const index = data.findIndex((user) => user.email === email);
    return { user: data[index], index: index };
  }
}
