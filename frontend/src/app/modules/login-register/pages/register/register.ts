import { Component } from '@angular/core';
import { Auth } from '../../../comentario/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
usuario = {
    nombre_usuario: '',
    edad: null,
    descripcion: '',
    contacto: '',
    mail: '',
    password: '',
    foto_perfil: ''

  };

  mensaje = '';

  constructor(private authService: Auth, private router: Router) {}

  registrar() {
    this.authService.register(this.usuario).subscribe({
      next: res => {
        this.mensaje = res.mensaje;
        this.router.navigate(['/login']); // Redirige solo si el registro fue exitoso
      },
      error: err => this.mensaje = err.error?.mensaje || 'Error'
    });
  }
}
