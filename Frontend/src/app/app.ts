import { Component, signal } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('loan-management-system');

  constructor (private router: Router){}
   isAdminRoute(): boolean {
    return this.router.url.includes('/admin');
  }

}
