import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Comentario, NuevoComentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})

export class ComentarioService {
  private apiUrl = 'http://localhost:2000/';
  constructor(private http: HttpClient) { }

  getComentariosPorReceta(idReceta: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/obtenerComentarios/receta/${idReceta}`)
      .pipe(
        map(comentarios => this.organizarComentarios(comentarios))
      );
  }

  crearComentario(comentario: NuevoComentario): Observable<any> {
    return this.http.post(`${this.apiUrl}/realizarComentario`, comentario);
  }

  editarComentario(id: number, comentario: { Comentario: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/editarComentario/${id}`, comentario);
  }

  borrarComentario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/borrarComentario/${id}`);
  }

  // Organiza comentarios en estructura jerárquica (padres e hijos)
  private organizarComentarios(comentarios: Comentario[]): Comentario[] {
    const comentariosMap = new Map<number, Comentario>();
    const comentariosPadres: Comentario[] = [];

    comentarios.forEach(comentario => {
      comentariosMap.set(comentario.id_comentario, comentario);
      comentario.respuestas = [];
    });

    comentarios.forEach(comentario => {
      if (comentario.id_comentarioPadre) {
        const padre = comentariosMap.get(comentario.id_comentarioPadre);
        if (padre) padre.respuestas?.push(comentario);
      } else {
        comentariosPadres.push(comentario);
      }
    });

    return comentariosPadres;
  }
}
