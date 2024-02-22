import { Component } from '@angular/core';
import { FileUpload } from '../../shared/models/file-upload.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent {
  constructor(private http: HttpClient, private ss: StorageService) {}

  public getFileFromAssets(): Observable<Blob> {
    const url = '/assets/good.jpg';
    return this.http.get(url, { responseType: 'blob' });
  }

  test() {
    this.getFileFromAssets().subscribe((res) => {
      this.ss
        .pushFileToStorage(
          new FileUpload(new File([res], 'blob.jpg', { type: 'image/jpg' }))
        )
        .subscribe((res) => {
          if (typeof res === `number`) {
            console.log('number:' + Math.round(res ? res : 0));
          } else {
            console.log('file' + res);
          }
        });
    });
  }
}
