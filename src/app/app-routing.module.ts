import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/microblog',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
 
  },
  {
    path: 'user-panel',
    loadChildren: () => import('./user-panel/user-panel.module').then(m => m.UserPanelModule)
   
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'microblog',
    loadChildren: () => import('./microblog/microblog.module').then(m => m.MicroblogModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
