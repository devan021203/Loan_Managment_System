import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../core/services/loan.service';

@Component({
  selector: 'app-my-loan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-loan.html',
  styleUrls: ['./my-loan.css'],
})
export class MyLoanComponent implements OnInit {

  
  loans: any[] = [];
  userId = 1; // later replace with login user

  constructor(private loanService: LoanService) {
    console.log("MyLoanComponent LOADED");

  }



  ngOnInit() {
    this.getMyLoans();   // ✅ FIX: call correct function
  }

 getMyLoans() {
  this.loanService.getLoans().subscribe({
    next: (res: any) => {

      console.log("API RESPONSE:", res);
      

      const data = res?.data || res?.result || res;

      this.loans = Array.isArray(data) ? data : [];

      console.log("FINAL LOANS:", this.loans);
    },
    error: (err) => {
      console.log(err);
    }
  });
}
  getStatusClass(status: string): string {
  switch ((status || '').toLowerCase()) {
    case 'approved':
      return 'status approved';

    case 'pending':
      return 'status pending';

    case 'rejected':
      return 'status rejected';

    default:
      return 'status';
  }
}
}