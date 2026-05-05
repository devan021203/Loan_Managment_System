import { Routes } from '@angular/router';

import { Dashboard } from './user/dashboard/dashboard';
import { ApplyLoan } from './user/apply-loan/apply-loan';
import { MyLoanComponent } from './user/my-loan/my-loan';

import { LoanList } from './admin/loan-list/loan-list';
import {Admin} from './admin/admin/admin';

import { Login } from './core/login/login';


import { authGuard } from './core/guards/authguard';
import { Register } from './core/register/register';

export const routes: Routes = [

  // 🔐 AUTH
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  



  // 👤 USER ROUTES
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'apply-loan', component: ApplyLoan, canActivate: [authGuard] },
  { path: 'my-loan', component: MyLoanComponent, canActivate: [authGuard] },

  // 🛡️ ADMIN ROUTES
  { path: 'admin', component: Admin, canActivate: [authGuard] },
  { path: 'loan-list', component: LoanList, canActivate: [authGuard] },

];