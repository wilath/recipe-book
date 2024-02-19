import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-supp/auth-interceptor.server";
import { RecipesService } from "./recipes/recipes.service";
import { DataStoragaService } from "./shared/data-storage.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { UserDataService } from "./auth/auth-supp/user-data.service";
import { MicroblogService } from "./microblog/microblog.service";


@NgModule({
    providers: [
        ShoppingListService,
        RecipesService,
        DataStoragaService,
        UserDataService,
        MicroblogService,
        {
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService, 
          multi: true
        }],
    exports: []
})
export class CoreModule{}