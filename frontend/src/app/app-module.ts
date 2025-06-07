import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { ComentarioListComponent } from './components/comentario-list/comentario-list.component';
import { ComentarioItemComponent } from './components/comentario-item/comentario-item.component';
import { ComentarioFormComponent } from './components/comentario-form/comentario-form.component';
@NgModule({
  declarations: [
    App,
    ComentarioFormComponent,
    ComentarioItemComponent,
    ComentarioListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    ComentarioListComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
