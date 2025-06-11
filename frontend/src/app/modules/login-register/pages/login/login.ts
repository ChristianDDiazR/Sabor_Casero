import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

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

  constructor(private authService: Auth) {}

  login() {
    this.authService.login(this.credenciales).subscribe({
      next: res => {
        this.mensaje = res.mensaje;
        localStorage.setItem('token', res.token);
      },
      error: err => this.mensaje = err.error?.mensaje || 'Error'
    });
  }
}
