import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private baseUrl = 'http://localhost:3000'; // Tu backend

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar/recetas`);
  }

  buscarRecetas(filtros: any): Observable<any[]> {
    const params = new HttpParams({ fromObject: filtros });
    return this.http.get<any[]>(`${this.baseUrl}/listar/recetas/buscar`, { params });
  }

  getRecipesByUser(idUsuario: number): Observable<any[]> {
    const params = new HttpParams().set('id_usuario', idUsuario.toString());
    return this.http.get<any[]>(`${this.baseUrl}/listar/recetas/buscar/usuario`, { params });
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/listar/recetas/${id}`);
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar/recetas/categorias`);
  }

  crearReceta(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/listar/recetas/crear`, data);
  }

  editarReceta(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/listar/recetas/editar/${id}`, data);
  }

  eliminarReceta(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/listar/recetas/eliminar/${id}`);
  }
}