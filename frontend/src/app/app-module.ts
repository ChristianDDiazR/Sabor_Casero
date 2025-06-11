import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { RecipesModule } from './modules/recipes/recipes-module';
import { App } from './app';
import { HttpClient, } from '@angular/common/http';
import { Login } from './modules/login-register/pages/login/login';
import { Register } from './modules/login-register/pages/register/register';


import { ComentarioListComponent } from './modules/comentario/comentario-list/comentario-list.component';
import { ComentarioItemComponent } from './modules/comentario/comentario-item/comentario-item.component';
import { ComentarioFormComponent } from './modules/comentario/comentario-form/comentario-form.component';
@NgModule({
  declarations: [
    App,
    ComentarioFormComponent,
    ComentarioItemComponent,
    ComentarioListComponent,
    Login,
    Register
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
