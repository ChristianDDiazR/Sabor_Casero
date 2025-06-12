import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Auth } from '../../comentario/services/auth'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css']
})
export class RecipeList implements OnInit {
  recipes: any[] = [];

  constructor(private http: HttpClient, private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/listar/recetas').subscribe({
      next: (data) => {
        this.recipes = data;
      },
      error: (err) => {
        console.error('Error al obtener recetas', err);
      }
    });
  }


  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  irALoginOPerfil(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/perfil']); // Ajusta según tu ruta real
    } else {
      this.router.navigate(['/login']);
    }
  }
}
