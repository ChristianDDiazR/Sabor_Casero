import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../comentario/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario implements OnInit{
  usuario: any;

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Recargar la página para reflejar el cambio
  }
}
