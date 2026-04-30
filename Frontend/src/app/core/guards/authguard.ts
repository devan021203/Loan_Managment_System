import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const role = localStorage.getItem('role');

  console.log('User role:', role);

  if (role === 'admin') {
    return true;
  }

  alert('Access Denied! Admin only');

  router.navigate(['/login']); // redirect user
  return false;
};