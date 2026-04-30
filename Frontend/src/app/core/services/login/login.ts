import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  // onLogin() {
  //   this.auth.login(this.loginData).subscribe((res: any) => {

  //     localStorage.setItem('token', res.token);
  //     localStorage.setItem('role', res.role);
  //     localStorage.setItem('userId', res.userId);

  //     // 🔥 ROLE BASED REDIRECT
  //     if (res.role === 'admin') {
  //       this.router.navigate(['/admin']);
  //     } else {
  //       this.router.navigate(['/dashboard']);
  //     }

  //   }, () => {
  //     alert('Invalid credentials');
  //   });
  // }

  onLogin() {

  // 🔥 Admin login
  if (this.loginData.username === 'admin' && this.loginData.password === 'admin123') {

    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('role', 'admin');
    localStorage.setItem('userId', '1');

    this.router.navigate(['/admin']);
    return;
  }

  // 👤 User login
  if (this.loginData.username === 'user' && this.loginData.password === 'user123') {

    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('role', 'user');
    localStorage.setItem('userId', '2');

    this.router.navigate(['/dashboard']);
    return;
  }

  // ❌ Invalid
  alert('Invalid credentials');
}
}