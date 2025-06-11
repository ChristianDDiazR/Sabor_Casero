import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Comentario } from '../models/comentario.model';
import { ComentarioService } from '../services/comentario.service';

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

  constructor(private comentarioService: ComentarioService) {}

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
  if (this.textoEditado.trim() === '') {
    alert('El comentario no puede estar vacío');
    return;
  }

  // Llamar al servicio para editar el comentario
  this.comentarioService.editarComentario(this.comentario.id_comentario, {
    Comentario: this.textoEditado
  }).subscribe(
    res => {
      console.log('Comentario actualizado:', res);
      this.comentario.Comentario = this.textoEditado; // Actualiza el valor local
      this.editando = false;
      this.comentarioEditado.emit(); // Notifica al padre que hubo cambios
    },
    err => {
      console.error('Error al actualizar el comentario', err);
      alert('Hubo un error al actualizar el comentario');
    }
  );
}

  toggleRespuesta(): void {
    this.respondiendo = !this.respondiendo;
  }


}
