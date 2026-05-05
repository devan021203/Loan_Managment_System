import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../core/services/loan.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {

  loans: any[] = [];
  filteredLoans: any[] = [];

  // 🔥 NEW
  users: any[] = [];

  constructor(
    private loanService: LoanService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadLoans();
    this.loadUsers(); // ✅ NEW
  }

  // ================= LOANS =================

  loadLoans() {
    this.loanService.getLoans().subscribe({
      next: (data: any) => {
        this.loans = data;
        this.filteredLoans = data;
      },
      error: (err) => console.log(err)
    });
  }

  get pendingCount() {
    return this.loans.filter(l => l.status === 'PENDING').length;
  }

  get approvedCount() {
    return this.loans.filter(l => l.status === 'APPROVED').length;
  }

  get rejectedCount() {
    return this.loans.filter(l => l.status === 'REJECTED').length;
  }

  filter(type: string) {
    if (type === 'All') {
      this.filteredLoans = this.loans;
    } else {
      this.filteredLoans = this.loans.filter(
        l => l.status === type.toUpperCase()
      );
    }
  }

  approve(loan: any) {
    loan.status = 'APPROVED';
  }

  reject(loan: any) {
    loan.status = 'REJECTED';
  }

  // ================= USERS =================

  loadUsers() {
    this.http.get('http://127.0.0.1:8000/api/loan/users/')
      .subscribe({
        next: (res: any) => {
          this.users = res;
        },
        error: (err) => console.log(err)
      });
  }

  get totalUsers() {
    return this.users.length;
  }

  get activeUsers() {
    return this.users.filter(u => u.is_active).length;
  }

  // ================= COMMON =================

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}