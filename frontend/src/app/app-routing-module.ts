import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './modules/login-register/pages/login/login';
import { Register } from './modules/login-register/pages/register/register';
import { Usuario } from './modules/login-register/pages/usuario/usuario';
import { RecipeDetail } from './modules/recipes/recipe-detail/recipe-detail';
import { EditarUsuarioComponent } from './modules/login-register/pages/editar-usuario/editar-usuario';
import { FavoritosList } from './modules/recipes/favoritos-list/favoritos-list';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' }, // redirecciona al inicio
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'perfil', component: Usuario },
  { path: 'detalle-recipes/:id', component: RecipeDetail },
  { path: 'editar-usuario', component: EditarUsuarioComponent },
  { path: 'favoritos', component: FavoritosList }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
