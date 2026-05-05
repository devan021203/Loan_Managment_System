import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class LoanService {

//   apiUrl = 'http://127.0.0.1:8000/api/';

//   private loansSubject = new BehaviorSubject<any[]>([]);
//   loans$ = this.loansSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   // APPLY LOAN
// applyLoan(data: any) {

//   const user = JSON.parse(localStorage.getItem('user') || '{}');

//   const payload = {
//     user: user.id,                 // ✅ required
//     user_name: user.username,      // must exist in DB
//     city: data.city,
//     amount: Number(data.amount),
//     status: 'PENDING'              // ⚠️ MUST BE EXACT
//   };

//   console.log("SENDING:", payload);

//   return this.http.post(this.apiUrl + 'apply/', payload);
// }

//   // GET LOANS
//   getLoans(userId?: number) {
//     let url = this.apiUrl + '/all/';

//     if (userId != null) {
//       url += `?user_id=${userId}`;
//     }

//     return this.http.get<any[]>(url);
//   }

//   // SET LOANS
//   setLoans(data: any[]) {
//     this.loansSubject.next(data);
//   }

//   // REFRESH LOANS
//   refreshLoans(userId?: number) {
//     this.getLoans(userId).subscribe((data: any[]) => {
//       this.loansSubject.next(data);
//     });
//   }

//   // DELETE
//   deleteLoan(id: number) {
//     return this.http.delete(this.apiUrl + 'delete/' + id + '/');
//   }

//   // UPDATE
//   updateLoanStatus(id: number, data: any) {
//     return this.http.patch(this.apiUrl + 'update/' + id + '/', data);
//   }
// }

@Injectable({ providedIn: 'root' })
export class LoanService {

  apiUrl = 'http://127.0.0.1:8000/api/';

  private loansSubject = new BehaviorSubject<any[]>([]);
  loans$ = this.loansSubject.asObservable();

  constructor(private http: HttpClient) {}

  applyLoan(data: any) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const payload = {
      user: user.id,   // ✅ must
      city: data.city,
      amount: Number(data.amount),
      status: 'PENDING'
    };
    return this.http.post(this.apiUrl + 'apply/', payload);
  }

  getLoans(userId?: number) {
    let url = this.apiUrl + 'all/';

    if (userId != null) {
      url += `?user_id=${userId}`;
    }

    return this.http.get<any[]>(url);
  }

  setLoans(data: any[]) {
    this.loansSubject.next(data);
  }

  refreshLoans(userId?: number) {
    this.getLoans(userId).subscribe((data: any[]) => {
      this.loansSubject.next(data);
    });
  }

  deleteLoan(id: number) {
    return this.http.delete(this.apiUrl + 'delete/' + id + '/');
  }

  updateLoanStatus(id: number, data: any) {
    return this.http.patch(this.apiUrl + 'update/' + id + '/', data);
  }
}