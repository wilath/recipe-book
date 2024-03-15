import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const UserDataRedirectGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const id = JSON.parse(localStorage.getItem('userData') || '{}').id
  router.navigate(['/user-panel', id])

  

  return true;
};
