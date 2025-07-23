import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes';
import { Auth } from '../../comentario/services/auth';
import { Comentario } from '../../comentario/models/comentario.model';
@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css'
})


export class RecipeDetail implements OnInit {
  receta: any;
  usuarioActualId: number | null = null;//nuevooooooo
  leGusta = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private http: HttpClient,
    private authService: Auth
  ) {}

  //
  ngOnInit(): void {
    this.usuarioActualId = this.authService.getUsuarioLogueado()?.id_usuario || null;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarReceta(+id);
    }
  }


  // Cargar receta + verificar si le dio like
  cargarReceta(id: number): void {
    this.http.get(`http://localhost:3000/listar/recetas/${id}`).subscribe({
      next: (data: any) => {
        this.receta = data;
        this.verificarLike(id); // Verifica si el usuario ya le dio like
      },
      error: (err) => {
        console.error('Error al obtener receta:', err);
      }
    });
  }

  // Verificar si el usuario actual ya dio like
  verificarLike(idReceta: number): void {
    if (!this.usuarioActualId) {
      this.leGusta = false;
      return;
    }

    this.recipeService.verificarLike(idReceta).subscribe({
      next: (res) => {
        this.leGusta = res.me_gusta;
      },
      error: () => {
        this.leGusta = false;
      }
    });
  }

  // Alternar me gusta / quitar like
  toggleLike(): void {
    if (!this.usuarioActualId) {
      alert('Debes iniciar sesión para dar me gusta.');
      return;
    }

    if (this.leGusta) {
      // Quitar like
      this.recipeService.quitarLike(this.receta.id_receta).subscribe({
        next: () => {
          this.leGusta = false;
          this.receta.me_gusta--; // Disminuir contador visual
        },
        error: (err) => {
          console.error('Error al quitar like', err);
          alert('No se pudo quitar el like');
        }
      });
    } else {
      // Dar like
      this.recipeService.darLike(this.receta.id_receta).subscribe({
        next: () => {
          this.leGusta = true;
          this.receta.me_gusta++; // Aumentar contador visual
        },
        error: (err) => {
          console.error('Error al dar like', err);
          alert('No se pudo dar el like');
        }
      });
    }
  }

  // Recargar comentarios (para cuando se crea/edita/elimina)
  cargarComentarios(): void {
    console.log('Recargando comentarios...');
    // Aquí puedes llamar al servicio de comentarios si lo tienes listo
    // Por ahora, queda pendiente para cuando conectes el servicio real
  }

  manejarComentarioActualizado(): void {
    this.cargarComentarios(); // Puedes mejorar esto más adelante
  }
}

