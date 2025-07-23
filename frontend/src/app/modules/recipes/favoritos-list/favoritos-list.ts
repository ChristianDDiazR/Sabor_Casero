import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes';
import { Auth } from '../../comentario/services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favoritos-list',
  standalone: false,
  templateUrl: './favoritos-list.html',
  styleUrl: '../recipe-list/recipe-list.css'
})
export class FavoritosList implements OnInit {
  recipes: any[] = [];
  categories: any[] = [];
  cargando = true;

  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.auth.getUsuarioLogueado();
    if (!usuario) {
      alert('Debes iniciar sesión para ver tus favoritos.');
      this.router.navigate(['/login']);
      return;
    }

    this.cargarFavoritos(usuario.id_usuario);
    this.cargarCategorias(); // Para mantener el filtro
  }

   cargarFavoritos(idUsuario: number): void {
    this.recipeService.getFavoritos(idUsuario).subscribe({
      next: (data) => {
        this.recipes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar favoritos', err);
        this.cargando = false;
        alert('No se pudieron cargar tus recetas favoritas.');
      }
    });
  }

  cargarCategorias(): void {
    this.recipeService.getCategorias().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/detalle-recipes', id]);
  }

  irALoginOPerfil(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/perfil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Añade estos métodos
  goToRecipes(): void {
    this.router.navigate(['/recipes']);
  }

  goToFavoritos(): void {
    this.router.navigate(['/favoritos']);
  }

}
