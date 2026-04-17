import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  email: string = ''
  password: string = ''

  router = inject(Router)

  login() {
    if (this.email === 'thomas.devine@atu.ie' && this.password === 'password') {
      localStorage.setItem('loggedIn', 'true')
      this.router.navigate(['/admin'])
    }
  }
}
