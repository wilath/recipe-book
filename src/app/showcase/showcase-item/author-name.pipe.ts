import { Pipe, PipeTransform } from '@angular/core';
import { UserDataService } from '../../auth/auth-supp/user-data.service';
import { UserData } from '../../shared/models/user-data.model';



@Pipe({
  name: 'authorname'
})
export class AuthorNamePipe implements PipeTransform {

  constructor(private userDataService: UserDataService) {}

  transform(author: string): string {
    const userData = this.userDataService.getUsersData().find(user => user.email === author);
    return userData ? userData.name : author;
  }
}
