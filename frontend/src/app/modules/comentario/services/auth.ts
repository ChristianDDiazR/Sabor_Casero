import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private baseUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
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

}
