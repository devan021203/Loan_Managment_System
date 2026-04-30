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

  constructor(
  private router: Router,
  private loanService: LoanService,
  private cd: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans() { 
    this.loanService.getLoans().subscribe({
      next: (data: any) => {
        console.log("LOANS FROM API:", data); // 🔥 check this
         this.loans = [...data]; // 🔥 IMPORTANT FIX
        this.cd.detectChanges(); // 🔥 FORCE UI refresh
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goToApplyLoan() {
    this.router.navigate(['/apply-loan']);
  }

 deleteLoan(id: number) {
  this.loanService.deleteLoan(id).subscribe({
    next: (res) => {
      console.log("Deleted:", res);
      this.loadLoans(); // refresh list after delete
    },
    error: (err) => {
      console.log("Delete error:", err);
    }
  });
} 

get pendingCount(): number {
  return this.loans?.filter(l => l.status === 'Pending').length || 0;
}

get approvedCount(): number {
  return this.loans?.filter(l => l.status === 'Approved').length || 0;
}

}