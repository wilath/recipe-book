import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthServcie } from '../auth/auth-supp/auth.servcie';
import { DataStoragaService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.component.media.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  isManage = false;
  private user$!: Subscription;

  constructor(
    private dataStorageService: DataStoragaService,
    private authService: AuthServcie
  ) {}

  ngOnInit() {
    this.user$ = this.authService.user.subscribe((user) => {
      this.isAuth = !user ? false : true;
      if (this.isAuth) {
        this.onFetchData();
      }
    });

    if (window.screen.width < 550) {
      this.isManage = true;
    }
  }
  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  onSavedata() {
    this.dataStorageService.storeRecipes();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }

}
