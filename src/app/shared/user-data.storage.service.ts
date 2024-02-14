import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';
import { AuthServcie } from '../auth/auth.servcie';

interface UserData {
  email: string;
  name: string;
  avatar?: string;
  followers?: string[];
  userFollows?: string[];
}

const userDataUrl: string = 'https://recipesproject-fc6f3-default-rtdb.europe-west1.firebasedatabase.app/users.json';

@Injectable()
export class UserDataStoragaService {
  constructor(private http: HttpClient) {}

  public loggedUserData$ = new BehaviorSubject<UserData | null>(null)


  public storeNewUserData(email: string, name: string) {
    const userToStore: UserData = {
      email: email,
      name: name,
    };
    this.http.put(userDataUrl, userToStore).subscribe();
  }

  public setUserData(email: string) {
     this.http.get<UserData[]>(userDataUrl).pipe(
      map((res) => res.filter((userData) => userData.email === email)),
      map((data) => (data.length > 0 ? data[0] : null)),
      tap((user) => this.loggedUserData$.next(user))
    ).subscribe()
  }
  public followUser(){}

  public unfollowUser(){}


}
