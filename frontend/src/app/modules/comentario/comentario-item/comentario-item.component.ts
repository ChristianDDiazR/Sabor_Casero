import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Comentario } from '../models/comentario.model';
import { ComentarioService } from '../services/comentario.service';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-comentario-item',
  standalone: false,
  templateUrl: './comentario-item.component.html',
  styleUrl: './comentario-item.component.css'
})

export class ComentarioItemComponent {
  @Input() comentario!: Comentario;
  @Input() idReceta!: number;
  @Input() usuarioActualId: number | null = null;
  @Output() comentarioEditado = new EventEmitter<void>();
  @Output() comentarioEliminado = new EventEmitter<void>();

  editando = false;
  textoEditado = '';
  respondiendo = false;
  textoRespuesta = '';

  constructor(private comentarioService: ComentarioService, private authService: Auth) {}

  iniciarEdicion(): void {
    this.textoEditado = this.comentario.Comentario;
    this.editando = true;
  }

  cancelarEdicion(): void {
    this.editando = false;
  }

  // guardarEdicion(): void {
  //   this.editando = false;
  //   this.comentarioEditado.emit();
  // }
  guardarEdicion(): void {
  if (!this.textoEditado.trim()) return; // Validación básica

  this.editando = false;

  // Llamar al servicio para actualizar el comentario
  this.comentarioService.editarComentario(this.comentario.id_comentario, {
    Comentario: this.textoEditado
  }).subscribe({
    next: () => {
      // Actualizar el valor local del comentario
      this.comentario.Comentario = this.textoEditado;
      this.comentarioEditado.emit(); // Notificar al padre
    },
    error: (err) => {
      console.error('Error al guardar edición', err);
      alert('No se pudo guardar el comentario');
    }
  });
}

  toggleRespuesta(): void {
    this.respondiendo = !this.respondiendo;
  }

  eliminarComentario(): void {
    if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) return;

    this.comentarioService.borrarComentario(this.comentario.id_comentario).subscribe({
      next: () => {
        this.comentarioEliminado.emit(); // Notifica al padre para actualizar
      },
      error: (err) => {
        console.error('Error al eliminar comentario', err);
        alert('No se pudo eliminar el comentario.');
      }
    });
  }


}
