import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComentarioService } from '../services/comentario.service';
import { NuevoComentario } from '../models/comentario.model';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-comentario-form',
  standalone: false,
  templateUrl: './comentario-form.component.html',
  styleUrl: './comentario-form.component.css'
})

export class ComentarioFormComponent {
  @Input() idReceta!: number;
  @Input() idComentarioPadre: number | null = null;
  @Output() comentarioCreado = new EventEmitter<void>();

  comentarioControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  enviando = false;

  constructor(private comentarioService: ComentarioService, private authService: Auth) {}
  publicarComentario(): void {
    if (this.comentarioControl.invalid || this.enviando) return;

    const usuario = this.authService.getUsuarioLogueado();

    if (!usuario) {
      alert('Debes iniciar sesión para comentar.');
      return;
    }

    this.enviando = true;

    const nuevoComentario: NuevoComentario = {
      id_usuarioComentario: usuario.id_usuario,
      id_recetaComentario: this.idReceta,
      Comentario: this.comentarioControl.value!,
      id_comentarioPadre: this.idComentarioPadre || null
    };


    this.comentarioService.crearComentario(nuevoComentario).subscribe({
      next: () => {
        this.comentarioControl.reset();
        this.comentarioCreado.emit();
      },
      error: (err) => console.error('Error al publicar comentario', err),
      complete: () => this.enviando = false
    });
  }
}
