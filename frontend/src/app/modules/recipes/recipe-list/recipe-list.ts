import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecipeService } from '../recipes';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.html',
  styleUrls: ['./recipe-list.css']
})
export class RecipeList implements OnInit {
  recipes: any[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  categories: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    // Cargar todas las recetas al inicio
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
      },
      error: (err) => {
        console.error('Error al obtener recetas', err);
      }
    });

    // Cargar las categorías desde el backend
    this.recipeService.getCategorias().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });
  }

  // Manejar búsqueda por texto
  onSearch(event: any): void {
    this.searchQuery = event.target.value;

    if (this.searchQuery.trim() !== '') {
      this.recipeService.buscarRecetas({ search: this.searchQuery }).subscribe({
        next: (results) => {
          this.recipes = results;
        },
        error: (err) => {
          console.error('Error al buscar recetas:', err);
          this.recipes = [];
        }
      });
    } else {
      // Si el campo está vacío, recargar todas las recetas
      this.recipeService.getAllRecipes().subscribe({
        next: (data) => {
          this.recipes = data;
        },
        error: (err) => {
          console.error('Error al recargar recetas:', err);
        }
      });
    }
  }

  // Manejar filtro por categoría
  onFilterByCategory(): void {
    const filters: any = {};

    if (this.selectedCategory) {
      filters.category = this.selectedCategory;
    }

    if (this.searchQuery) {
      filters.search = this.searchQuery;
    }

    if (Object.keys(filters).length > 0) {
      this.recipeService.buscarRecetas(filters).subscribe({
        next: (results) => {
          this.recipes = results;
        },
        error: (err) => {
          console.error('Error al aplicar filtros:', err);
          this.recipes = [];
        }
      });
    } else {
      // Sin filtros, mostrar todas las recetas
      this.recipeService.getAllRecipes().subscribe({
        next: (data) => {
          this.recipes = data;
        },
        error: (err) => {
          console.error('Error al recargar recetas:', err);
        }
      });
    }
  }

  // Navegar a detalle de receta
  verDetalle(id: number): void {
    this.router.navigate(['/detalle-recipes', id]);
  }

  // Navegar a ruta /recipes
  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

  // Navegar a login
  goToLogin() {
    this.router.navigate(['/login']);
  }

}