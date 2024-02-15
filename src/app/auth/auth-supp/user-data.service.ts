import { Injectable } from '@angular/core';
import { DataStoragaService } from '../../shared/data-storage.service';
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
    console.log('User Data is set')
    console.log(this.usersData)
  }

  public getUsersData() {
    return this.usersData.slice();
  }

  public addNewUser(email: string, name: string) {
    const newUserData: UserData = {
      email: email,
      name: name,
    };
    this.usersData.push(newUserData);
    this.userDataChange.next(this.usersData.slice());
  }
}
