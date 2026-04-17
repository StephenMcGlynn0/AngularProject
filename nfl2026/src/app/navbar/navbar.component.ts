import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router)

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true'
  }

  logout() {
    localStorage.removeItem('loggedIn')
    this.router.navigate(['/'])
  }

}
