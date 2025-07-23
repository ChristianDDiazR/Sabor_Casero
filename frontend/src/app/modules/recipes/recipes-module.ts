import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing-module';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { RecipeForm } from './recipe-form/recipe-form';
import { MyRecipes } from './my-recipes/my-recipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComentarioListComponent } from '../comentario/comentario-list/comentario-list.component';
import { ComentarioFormComponent } from '../comentario/comentario-form/comentario-form.component';
import { ComentarioItemComponent } from '../comentario/comentario-item/comentario-item.component';
import { SharedModule } from '../../shared/shared.module';
import { FavoritosList } from './favoritos-list/favoritos-list';


@NgModule({
  declarations: [
    RecipeList,
    RecipeDetail,
    RecipeForm,
    MyRecipes,
    FavoritosList,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule

  ]
})
export class RecipesModule { }
