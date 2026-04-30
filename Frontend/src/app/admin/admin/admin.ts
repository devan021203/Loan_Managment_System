import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../core/services/loan.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {

  loans: any[] = [];
  filteredLoans: any[] = [];

  constructor(
    private loanService: LoanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLoans();
  }

  // 🔹 Load loans
  getLoans() {
    this.loanService.getLoans().subscribe({
      next: (res: any) => {
        this.loans = res;
        this.filteredLoans = res;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load loans');
      }
    });
  }

  // 🔹 Approve
  approve(loan: any) {
    this.loanService.updateLoanStatus(loan.id, { status: 'Approved' })
      .subscribe(() => this.getLoans());
      console.log('Approve clicked', loan); // 👈 must print

  }

  // 🔹 Reject
  reject(loan: any) {
    this.loanService.updateLoanStatus(loan.id, { status: 'Rejected' })
      .subscribe(() => this.getLoans());
  }

  // 🔹 Filter
  filter(status: string) {
    if (status === 'All') {
      this.filteredLoans = this.loans;
    } else {
      this.filteredLoans = this.loans.filter(l => l.status === status);
    }
  }

  // 🔹 Logout
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // 🔹 Counts
  get pendingCount() {
    return this.loans.filter(l => l.status === 'Pending').length;
  }

  get approvedCount() {
    return this.loans.filter(l => l.status === 'Approved').length;
    
  }

  get rejectedCount() {
    return this.loans.filter(l => l.status === 'Rejected').length;
  }
}