import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private baseUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data).pipe(
      tap((respuesta: any) => {
        if (respuesta.token) {
          localStorage.setItem('token', respuesta.token);
          localStorage.setItem('usuario', JSON.stringify(respuesta.usuario)); // 👈 guardamos usuario
        }
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, data);
  }
  //nuevo
  getUsuarioLogueado(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar JWT
      return {
        id_usuario: payload.id_usuario,
        mail: payload.mail
      };
    } catch (e) {
      console.error('Error decodificando el token', e);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  editarUsuario(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put('http://localhost:3000/api/usuarios/editar', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
