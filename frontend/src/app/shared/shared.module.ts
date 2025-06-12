import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Vamos a crear un módulo compartido donde declares una
//  sola vez estos componentes de comentarios
// y luego lo importas donde lo necesites.
// Componentes compartidos
import { ComentarioFormComponent } from '../modules/comentario/comentario-form/comentario-form.component';
import { ComentarioItemComponent } from '../modules/comentario/comentario-item/comentario-item.component';
import { ComentarioListComponent } from '../modules/comentario/comentario-list/comentario-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ComentarioFormComponent,
    ComentarioItemComponent,
    ComentarioListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ComentarioFormComponent,
    ComentarioItemComponent,
    ComentarioListComponent
  ]
})
export class SharedModule {}
