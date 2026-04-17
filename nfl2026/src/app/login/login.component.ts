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

  router = inject(Router)

  login() {
    let emailInput = document.getElementById('email') as HTMLInputElement;
    let passwordInput = document.getElementById('password') as HTMLInputElement;
    console.log('Email:', emailInput.value);
    console.log('Password:', passwordInput.value);

    if (emailInput.value === 'thomas.devine@atu.ie' && passwordInput.value === 'password') {
      localStorage.setItem('loggedIn', 'true')
      this.router.navigate(['/admin'])
    }else{
      alert('Invalid credentials. Please try again.')
    }
  }
}
