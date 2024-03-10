import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecipeResolverService } from './recipes/recipes-resolver-service';
import { UserDataResolverService } from './user-panel/user-data-resolver.service';
import { MicroblogResolverService } from './microblog/microblog-resolver.service';


const appRoutes: Routes = [

  {
    path: '',
    redirectTo: '/microblog',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule),
    resolve:[ RecipeResolverService, UserDataResolverService]
  },
  {
    path: 'user-panel',
    loadChildren: () => import('./user-panel/user-panel.module').then(m => m.UserPanelModule),
    resolve:[UserDataResolverService, RecipeResolverService, MicroblogResolverService]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'microblog',
    loadChildren: () => import('./microblog/microblog.module').then(m => m.MicroblogModule),
    resolve:[UserDataResolverService, MicroblogResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
