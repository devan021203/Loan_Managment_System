import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoanService } from '../../core/services/loan.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {

  loans: any[] = [];
  username: string = '';

  constructor(
    private router: Router,
    private loanService: LoanService,
    private cd: ChangeDetectorRef
  ) {}

ngOnInit(): void {

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  console.log("USER FROM STORAGE:", user);
  console.log("USER ID:", user.id);

  this.username = user.username || '';

  this.loadLoans();
}

loadLoans() {

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = Number(user.id);

  if (!userId) {
    console.log('No user ID found');
    return;
  }

  this.loanService.getLoans(userId).subscribe({
    next: (data: any) => {
      this.loans = data;
      this.cd.detectChanges(); // optional but safe
    },
    error: (err) => console.log(err)
  });
}

  goToApplyLoan() {
    this.router.navigate(['/apply-loan']);
  }

  deleteLoan(id: number) {
    this.loanService.deleteLoan(id).subscribe({
      next: () => this.loadLoans(),
      error: (err) => console.log(err)
    });
  }

  get pendingCount(): number {
    return this.loans?.filter(l => l.status === 'PENDING').length || 0;
  }

  get approvedCount(): number {
    return this.loans?.filter(l => l.status === 'APPROVED').length || 0;
  }

  logout() {
  localStorage.removeItem('user');   // clear user session
  localStorage.removeItem('token');  // if using JWT

  this.router.navigate(['/login']);   // redirect to login
}
}

