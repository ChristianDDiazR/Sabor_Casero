import { Component } from '@angular/core';
import { Auth } from '../../../comentario/services/auth';

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

  constructor(private authService: Auth) {}

  registrar() {
    this.authService.register(this.usuario).subscribe({
      next: res => this.mensaje = res.mensaje,
      error: err => this.mensaje = err.error?.mensaje || 'Error'
    });
  }
}
