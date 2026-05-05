import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  user = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMsg = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {

    if (this.user.password !== this.user.confirmPassword) {
      this.errorMsg = "Passwords do not match!";
      return;
    }

    this.loading = true;
    console.log(this.onRegister);
    

    this.http.post('http://127.0.0.1:8000/api/register/', {
      full_name: this.user.fullName,
      email: this.user.email,
      password: this.user.password
    }).subscribe({
      next: () => {
        this.loading = false;

        alert("Account created successfully!");

        // 👉 AFTER REGISTER → GO TO LOGIN
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = "Registration failed!";
      }
    });
  }
}