import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserData } from '../../shared/models/user-data.model';

@Injectable()
export class UserDataService {
  constructor() {}

  public usersData: UserData[] = [];

  public userDataChange = new Subject<UserData[]>();

  public setUsersData(users: UserData[]) {
    this.usersData = users;
    this.userDataChange.next(this.usersData.slice());
  }

  public getUsersData() {
    return this.usersData.slice();
  }
  public getUserData(email:string) {
    const index = this.usersData.findIndex(user => user.email === email)
    return this.usersData[index]
  }

  public addNewUser(email: string, name: string) {
    const newUserData: UserData = {
      email: email,
      name: name,
    };
    this.usersData.push(newUserData);
    this.userDataChange.next(this.usersData.slice());
  }
  public editUser(editedUser: UserData) {
    const data: UserData[] = this.usersData;
    const index = data.findIndex((user) => user.email === editedUser.email);
    data[index] = editedUser;
    this.usersData = data;
    this.userDataChange.next(this.usersData.slice());
  }
}
