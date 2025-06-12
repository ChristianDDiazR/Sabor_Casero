import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { RecipeForm } from './recipe-form/recipe-form';
import { MyRecipes } from './my-recipes/my-recipes';
const routes: Routes = [
  { path: 'recipes', component: RecipeList },
  { path: 'detalle-recipes/:id', component: RecipeDetail },
  { path: 'edit/:id', component: RecipeForm },
  { path: 'create', component: RecipeForm },
  { path: 'my', component: MyRecipes },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
