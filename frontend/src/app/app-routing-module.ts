import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './modules/login-register/pages/login/login';
import { Register } from './modules/login-register/pages/register/register';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
