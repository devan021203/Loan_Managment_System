import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  user = {
    email: '',
    password: ''
  };

  errorMsg = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {

  this.loading = true;
  this.errorMsg = '';

  this.http.post('http://127.0.0.1:8000/api/login/', {
    username: this.user.email,
    password: this.user.password
  }).subscribe({
    next: (res: any) => {

      this.loading = false;

      console.log("LOGIN RESPONSE:", res); // 🔥 DEBUG

      localStorage.setItem('user', JSON.stringify(res));

      const saved = JSON.parse(localStorage.getItem('user') || '{}');
      console.log("STORED USER:", saved);

      alert("Login Successful");

      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      this.loading = false;
      console.log(err);
      this.errorMsg = "Invalid email or password!";
    }
  });
}
  goRegister() {
  console.log("clicked register");
  this.router.navigate(['/register']);
}
}