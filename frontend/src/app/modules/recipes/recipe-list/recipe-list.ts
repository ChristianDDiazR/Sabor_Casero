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
  constructor(private http: HttpClient, private router: Router, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
      },
      error: (err) => {
        console.error('Error al obtener recetas', err);
      }
    });
  }

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
      // Si el campo está vacío, vuelve a cargar todas las recetas
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

  verDetalle(id: number): void {
    this.router.navigate(['/detalle-recipes', id]);
  }

  goToRecipes() {
    this.router.navigate(['/recipes']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
