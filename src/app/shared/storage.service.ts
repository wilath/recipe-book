import { Injectable } from '@angular/core';
import { FileUpload } from './models/file-upload.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class StorageService {
  constructor() {}

  private basePath = '/uploads';

  public pushFileToStorage(file: FileUpload): Observable<number> {
    return of(1)
  }
}
