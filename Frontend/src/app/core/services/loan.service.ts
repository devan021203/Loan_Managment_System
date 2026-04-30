import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanService {

  apiUrl = 'http://127.0.0.1:8000/api/loan/';

  // 🔥 shared data store
  private loansSubject = new BehaviorSubject<any[]>([]);
  loans$ = this.loansSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 🔵 apply loan
  applyLoan(data: any) {
    return this.http.post(this.apiUrl + 'apply/', data);
  }

  // 🔵 get all loans from backend
  getLoans() {
    return this.http.get<any[]>(this.apiUrl + 'all/');
  }

  // 🔥 update shared data
  setLoans(data: any[]) {
    this.loansSubject.next(data);
  }

  // 🔥 refresh data from backend
  refreshLoans() {
    this.getLoans().subscribe((data) => {
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