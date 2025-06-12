import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { RecipesModule } from './modules/recipes/recipes-module';
import { App } from './app';
import { HttpClient, } from '@angular/common/http';
import { Login } from './modules/login/login';
import { Register } from './modules/register/register';


import { ComentarioListComponent } from './modules/comentario/comentario-list/comentario-list.component';
import { ComentarioItemComponent } from './modules/comentario/comentario-item/comentario-item.component';
import { ComentarioFormComponent } from './modules/comentario/comentario-form/comentario-form.component';
import { Usuario } from './modules/usuario/usuario';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    //quitar de acá los componentes de comentarios, ahora serán compartidos
    App,
    Login,
    Register,
    Usuario
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  exports:[
    ComentarioListComponent,
    RecipesModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
