import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private baseUrl = 'http://localhost:3000'; // Base común para ambas rutas

  constructor(private http: HttpClient) {}

  // Obtener todas las recetas
  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar/recetas`);
  }

  // Buscar con filtros (texto, categoría, etc.)
  buscarRecetas(filtros: any): Observable<any[]> {
    const params = new HttpParams({ fromObject: filtros });
    return this.http.get<any[]>(`${this.baseUrl}/buscar/recetas`, { params });
  }
}
