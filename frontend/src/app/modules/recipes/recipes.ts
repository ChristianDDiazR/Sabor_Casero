import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private baseUrl = 'http://localhost:3000'; // Base común para ambas rutas
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  constructor(private http: HttpClient) {}

  // Obtener todas las recetas
  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar/recetas`);
  }

  // Buscar con filtros (texto, categoría, etc.)
  buscarRecetas(filtros: any): Observable<any[]> {
    const params = new HttpParams({ fromObject: filtros });
    return this.http.get<any[]>(`${this.baseUrl}/listar/recetas/buscar`, { params });
  }

  getRecipeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/recetas/${id}`);
  }

  // Obtener categorías desde el backend
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar/recetas/categorias`);
  }
  // Verifica si el usuario actual le dio like
  verificarLike(idReceta: number): Observable<{ me_gusta: boolean }> {
    return this.http.get<{ me_gusta: boolean }>(
      `${this.baseUrl}/listar/recetas/${idReceta}/like`,
    {headers: this.getAuthHeaders()});
  }

  // Dar like
  darLike(idReceta: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/listar/recetas/${idReceta}/like`,
      {},
    {headers: this.getAuthHeaders()});
  }

  // Quitar like
  quitarLike(idReceta: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/listar/recetas/${idReceta}/like`,
    {headers: this.getAuthHeaders()});
  }

  getFavoritos(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar/recetas/favoritos/${idUsuario}`,
      {headers: this.getAuthHeaders()}
    );
  }
}
