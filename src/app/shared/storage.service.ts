import { Injectable } from '@angular/core';
import { FileUpload } from './models/file-upload.model';
import { Observable, Subject, finalize, merge, of } from 'rxjs';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage'

export interface storageFileReturn {
  percentages: Observable<number | undefined>;
  fileData: FileUpload
}


@Injectable()
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  private basePath = '/uploads';

  public pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined | FileUpload>{
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    const extraDataSubject = new Subject<FileUpload | number | undefined>();

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          fileUpload.key = `${fileUpload.name}` + `${Math.floor(Math.random() * 10000)}`;
          extraDataSubject.next(fileUpload);
          extraDataSubject.complete();
        });
      })
    ).subscribe();

    uploadTask.percentageChanges().subscribe(percentage => {
      extraDataSubject.next(percentage); 
    });

    return extraDataSubject.asObservable();
  }

  public deleteFile(fileUpload: FileUpload): void {
    this.deleteFileStorage(fileUpload.name);    
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
 

