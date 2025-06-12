import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './modules/login-register/pages/login/login';
import { Register } from './modules/login-register/pages/register/register';
import { Usuario } from './modules/login-register/pages/usuario/usuario';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' }, // redirecciona al inicio
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'perfil', component: Usuario }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
