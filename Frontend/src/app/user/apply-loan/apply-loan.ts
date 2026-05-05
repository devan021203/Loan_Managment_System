import { Component } from '@angular/core';
import { LoanService } from '../../core/services/loan.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-loan',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './apply-loan.html',
  styleUrls: ['./apply-loan.css'],
})
export class ApplyLoan {

  // ✅ bind form values here
  loan = {
    user_name:"" ,
    amount:"0",
    city:"",
    status: 'PENDING'
  };

  constructor(
    private loanService: LoanService,
    private router: Router
  ) {}
  

 apply() {

  this.loanService.applyLoan(this.loan).subscribe({
    next: () => {
      alert('Loan Applied Successfully');
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.log(err);
      alert('Error applying loan');
    }
  });
}
}