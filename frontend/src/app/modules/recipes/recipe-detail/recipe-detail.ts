import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes';
@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})


export class RecipeDetail implements OnInit {
  receta: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:3000/listar/recetas/${id}`)
      .subscribe(
        data => this.receta = data,
        error => console.error('Error al obtener receta:', error)
      );
  }
}

