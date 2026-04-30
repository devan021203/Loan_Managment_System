import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {

  constructor(private router: Router) {}

  goAdmin() {
    localStorage.setItem('role', 'admin'); // simulate login
    this.router.navigate(['/admin']);
  }
}