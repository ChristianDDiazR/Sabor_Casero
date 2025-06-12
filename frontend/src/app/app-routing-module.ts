import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './modules/login/login';
import { Register } from './modules/register/register';
import { Usuario } from './modules/usuario/usuario';
import { RecipeDetail } from './modules/recipes/recipe-detail/recipe-detail';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' }, // redirecciona al inicio
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'perfil', component: Usuario },
  { path: 'detalle-recipes/:id', component: RecipeDetail }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
