import { Injectable, Injector } from '@angular/core';
import { DataStoragaService } from './data-storage.service';

@Injectable()
export class MediationService {
  constructor(private injector: Injector) {}

  public storetAllData() {
    this.storeMicroblogData();
    this.storeUsersData();
    this.storeRecipesData();
  }

  public storeMicroblogData() {
    this.injector.get(DataStoragaService).storeMicroblogData()
  }

  public storeUsersData() {
    this.injector.get(DataStoragaService).storeUsersData()

  }

  public storeRecipesData() {
    this.injector.get(DataStoragaService).storeRecipes()
  }
}
