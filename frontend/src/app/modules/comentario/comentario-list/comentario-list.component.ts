import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComentarioService } from '../services/comentario.service';
import { Comentario } from '../models/comentario.model';

@Component({
  selector: 'app-comentario-list',
  standalone: false,
  templateUrl: './comentario-list.component.html',
  styleUrl: './comentario-list.component.css'
})

export class ComentarioListComponent implements OnChanges{
  @Input() idReceta!: number;
  @Input() usuarioActualId: number | null = null;

  comentarios: Comentario[] = [];
  cargando = true;

  constructor(private comentarioService: ComentarioService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idReceta'] && this.idReceta) {
      this.cargarComentarios();
    }
  }

  cargarComentarios(): void {
    this.cargando = true;
    this.comentarioService.getComentariosPorReceta(this.idReceta).subscribe({
      next: (comentarios: Comentario[]) => {
        this.comentarios = comentarios;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error cargando comentarios', err);
        this.cargando = false;
      }
    });
  }

  calcularTiempoTranscurrido(fecha: Date): string {
    const ahora = new Date();
    const fechaComentario = new Date(fecha);
    const horas = Math.floor((ahora.getTime() - fechaComentario.getTime()) / (1000 * 60 * 60));

    if (horas < 1) return 'hace menos de 1 hora';
    if (horas < 24) return `hace ${horas} horas`;

    const dias = Math.floor(horas / 24);
    return `hace ${dias} días`;
  }

  manejarComentarioActualizado(): void {
    this.cargarComentarios();
  }
}
