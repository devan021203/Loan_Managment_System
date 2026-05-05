import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule,],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {

  role: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    console.log("ROLE:", this.role);

    if (user) {
      const data = JSON.parse(user);
      this.role = data.role;   // ✅ real role from backend
    }
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}