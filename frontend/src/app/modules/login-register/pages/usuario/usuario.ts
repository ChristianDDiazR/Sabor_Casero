import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../comentario/services/auth';
import { RecipeService } from '../../../recipes/recipes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
// ... importaciones

export class Usuario implements OnInit {
  usuario: any;
  recetas: any[] = [];
  showCrearModal = false;

  // Modelo único para crear/editar
  recetaForm = {
    id_receta: null as number | null,
    nombre_receta: '',
    descripcion: '',
    id_categoria: null as number | null,
    imagen: ''
  };

  categorias = [
    { id: 1, nombre: 'Desayuno' },
    { id: 2, nombre: 'Almuerzo' },
    { id: 3, nombre: 'Cena' },
    { id: 4, nombre: 'Postre' },
    { id: 5, nombre: 'Bebida' }
  ];

  constructor(
    private authService: Auth,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    if (this.usuario?.id_usuario) {
      this.cargarRecetas();
    }
  }

  cargarRecetas(): void {
    this.recipeService.getRecipesByUser(this.usuario.id_usuario).subscribe({
      next: (recetas) => {
        this.recetas = recetas;
      },
      error: (err) => {
        console.error('Error al cargar recetas:', err);
      }
    });
  }

  // ✅ Abre modal para CREAR
  abrirModalCrear(): void {
    this.recetaForm = {
      id_receta: null,
      nombre_receta: '',
      descripcion: '',
      id_categoria: null,
      imagen: ''
    };
    this.showCrearModal = true;
  }

  // ✅ Abre modal para EDITAR
  abrirModalEditar(id: number): void {
    const receta = this.recetas.find(r => r.id_receta === id);
    if (!receta) {
      alert('Receta no encontrada');
      return;
    }
    this.recetaForm = { ...receta };
    this.showCrearModal = true;
  }

  // ✅ Cierra el modal
  cerrarModal(): void {
    this.showCrearModal = false;
  }

  // ✅ Maneja selección de imagen
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.recetaForm.imagen = (reader.result as string).split(',')[1]; // Solo Base64
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ Guarda (crea o edita)
  guardarReceta(): void {
    if (!this.recetaForm.nombre_receta || !this.recetaForm.descripcion || !this.recetaForm.id_categoria) {
      alert('Completa todos los campos obligatorios');
      return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const id_usuarioReceta = usuario.id_usuario;

    if (!id_usuarioReceta) {
      alert('No se pudo obtener tu ID');
      return;
    }

    const data = {
      ...this.recetaForm,
      id_usuarioReceta,
      calificacion: 0
    };

    if (this.recetaForm.id_receta) {
      // Editar
      this.recipeService.editarReceta(this.recetaForm.id_receta, data).subscribe({
        next: (recetaActualizada) => {
          const index = this.recetas.findIndex(r => r.id_receta === this.recetaForm.id_receta);
          if (index !== -1) this.recetas[index] = recetaActualizada;
          this.cerrarModal();
          alert('✅ Receta actualizada');
        },
        error: (err) => {
          console.error('Error al editar:', err);
          alert('❌ No se pudo actualizar');
        }
      });
    } else {
      // Crear
      this.recipeService.crearReceta(data).subscribe({
        next: (recetaCreada) => {
          this.recetas.unshift(recetaCreada);
          this.cerrarModal();
          alert('✅ Receta creada');
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('❌ No se pudo crear');
        }
      });
    }
  }

  eliminarReceta(id: number): void {
    if (confirm('¿Eliminar esta receta?')) {
      this.recipeService.eliminarReceta(id).subscribe({
        next: () => {
          this.recetas = this.recetas.filter(r => r.id_receta !== id);
          alert('🗑️ Eliminada');
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('❌ No se pudo eliminar');
        }
      });
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}