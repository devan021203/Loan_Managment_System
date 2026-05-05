 import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const user = localStorage.getItem('user');

  if (user) {
    return true;   // allow access
  } else {
    return false;  // block access
  }
};