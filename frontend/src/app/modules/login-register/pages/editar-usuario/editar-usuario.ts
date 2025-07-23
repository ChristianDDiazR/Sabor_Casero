import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Auth } from '../../../comentario/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-editar-usuario',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.html',
  styleUrls: ['./editar-usuario.css']
})
export class EditarUsuarioComponent implements OnInit {
  form: FormGroup;
  usuario: any;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre_usuario: [''],
      edad: [''],
      descripcion: [''],
      contacto: [''],
      mail: [''],
      foto_perfil: ['']
    });
  }

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    if (this.usuario) {
      this.form.patchValue(this.usuario);
    }
  }

  // guardarCambios(): void {
  //   this.authService.editarUsuario(this.form.value).subscribe({
  //     next: () => {
  //       alert('Perfil actualizado correctamente');
  //       this.router.navigate(['/']);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('Error al actualizar perfil');
  //     }
  //   });
  // }
  guardarCambios(): void {
    this.authService.editarUsuario(this.form.value).subscribe({
      next: (res) => {
        // ✅ 1. Actualizar el usuario en localStorage
        const usuarioActual = this.authService.getUsuario();
        const usuarioActualizado = { ...usuarioActual, ...this.form.value };

        // Guardar en localStorage
        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

        // ✅ 2. Actualizar el componente actual
        this.usuario = usuarioActualizado;

        alert('Perfil actualizado correctamente');

        this.router.navigate(['/perfil'], { replaceUrl: true });
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar perfil');
      }
    });
  }

  get fotoPerfilUrl(): string | null {
    const url = this.form.get('foto_perfil')?.value;
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      return url;
    }
    return null;
  }
  onPreviewError(event: any): void {
    event.target.style.display = 'none';
  }
}
