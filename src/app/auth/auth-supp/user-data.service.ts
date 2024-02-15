import { Injectable } from '@angular/core';
import { DataStoragaService } from '../../shared/data-storage.service';
import { Subject } from 'rxjs';
import { UserData } from '../../shared/models/user-data.model';

@Injectable()
export class UserDataService {
  constructor() {}

  public usersData: UserData[] = [];
  public userDataChange = new Subject<UserData[]>()


  
  public setUserdata(users: UserData[]){
    this.usersData = users;
    this.userDataChange.next(this.usersData.slice())
  }

}
