import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing-module';
import { RecipeList } from './recipe-list/recipe-list';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { RecipeForm } from './recipe-form/recipe-form';
import { MyRecipes } from './my-recipes/my-recipes';


@NgModule({
  declarations: [
    RecipeList,
    RecipeDetail,
    RecipeForm,
    MyRecipes
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
