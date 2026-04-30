import { Routes } from '@angular/router';
import { Dashboard } from './user/dashboard/dashboard';
import { ApplyLoan } from './user/apply-loan/apply-loan';
import { MyLoanComponent } from './user/my-loan/my-loan';
import { LoanList } from './admin/loan-list/loan-list';
import { authGuard } from './core/guards/authguard';
import { LoginComponent } from './core/services/login/login';
import { AdminComponent } from './admin/admin/admin';

export const routes: Routes = [

    //user
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path :'login',component : LoginComponent},
    {path :'dashboard', component : Dashboard},
    {path :'apply-loan',component : ApplyLoan},
    {path :'my-loan',component : MyLoanComponent},

    // admin
    { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
    { path: 'admin', component: AdminComponent },
    { path: 'admin', component: LoanList }



];
