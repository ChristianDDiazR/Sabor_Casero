import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../comentario/services/auth';

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario implements OnInit{
  usuario: any;

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
  }
}
