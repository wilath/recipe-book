import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-supp/auth-interceptor.server";
import { RecipesService } from "./recipes/recipes.service";
import { RealTimeDatabaseService } from "./shared/real-time-database.service";
import { UserDataService } from "./user-panel/user-data.service";
import { MicroblogService } from "./microblog/microblog.service";


@NgModule({
    providers: [
        RecipesService,
        RealTimeDatabaseService,
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