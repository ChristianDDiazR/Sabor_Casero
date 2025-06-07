import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Comentario } from '../../models/comentario.model';

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

  constructor() {}

  iniciarEdicion(): void {
    this.textoEditado = this.comentario.Comentario;
    this.editando = true;
  }

  cancelarEdicion(): void {
    this.editando = false;
  }

  guardarEdicion(): void {
    this.editando = false;
    this.comentarioEditado.emit();
  }

  toggleRespuesta(): void {
    this.respondiendo = !this.respondiendo;
  }

  
}
