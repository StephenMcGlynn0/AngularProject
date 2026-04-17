import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true'
  }

  logout() {
    localStorage.removeItem('loggedIn')
  }

}
