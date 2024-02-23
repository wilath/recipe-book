import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, Subject, finalize } from 'rxjs';
import { FileUpload } from './models/file-upload.model';


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

  public deleteFile(fileUploaDname: string): void {
    this.deleteFileStorage(fileUploaDname);    
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
 

