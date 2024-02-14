import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.server";
import { RecipesService } from "./recipes/recipes.service";
import { DataStoragaService } from "./shared/data-storage.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { UserDataStoragaService } from "./shared/user-data.storage.service";

@NgModule({
    providers: [
        ShoppingListService,
        RecipesService,
        DataStoragaService,
        UserDataStoragaService,
        {
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService, 
          multi: true
        }],
    exports: []
})
export class CoreModule{}