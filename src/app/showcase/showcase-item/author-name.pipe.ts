import { Pipe, PipeTransform } from '@angular/core';
import { UserDataStoragaService } from '../../shared/user-data.storage.service';



@Pipe({
  name: 'authorname'
})
export class AuthorNamePipe implements PipeTransform {

  constructor(private userData: UserDataStoragaService) {}

  transform(author: string): string {
  
    
    return  ''
  }
}
