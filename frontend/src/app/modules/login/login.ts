import { Component } from '@angular/core';
import { Auth } from '../comentario/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
credenciales = {
  mail: '',
  password: '' // <- usa la ñ
};


  mensaje = '';

  constructor(private authService: Auth, private router: Router) {}

  login() {
    this.authService.login(this.credenciales).subscribe({
      next: res => {
        this.mensaje = res.mensaje;
        localStorage.setItem('token', res.token);
        this.router.navigate(['/recipes']);
      },
      error: err => this.mensaje = err.error?.mensaje || 'Error'
    });
  }
}
