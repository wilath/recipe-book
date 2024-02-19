import { Injectable } from '@angular/core';
import { DataStoragaService } from './data-storage.service';

@Injectable()
export class MediationService {
  constructor(private dataStorageService: DataStoragaService) {}

  public storetAllData() {
    this.storeMicroblogData();
    this.storeUsersData();
    this.storeRecipesData();
  }

  public storeMicroblogData() {
    this.dataStorageService.storeMicroblogData();
  }

  public storeUsersData() {
    this.dataStorageService.storeUsersData();
  }

  public storeRecipesData() {
    this.dataStorageService.storeRecipes();
  }
}
