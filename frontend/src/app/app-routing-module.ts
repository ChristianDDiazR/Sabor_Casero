import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './modules/login-register/pages/login/login';
import { Register } from './modules/login-register/pages/register/register';
import { RecipeDetail } from './modules/recipes/recipe-detail/recipe-detail';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' }, // redirecciona al inicio
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'detalle-recipes/:id', component: RecipeDetail }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
