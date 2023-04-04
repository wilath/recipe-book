import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.server";
import { RecipesService } from "./recipes/recipes.service";
import { dataStoragaService } from "./shared/data-storage.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule({
    providers: [
        ShoppingListService,
        RecipesService,
        dataStoragaService,
        {
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptorService, 
          multi: true
        }],
    exports: []
})
export class CoreModule{}