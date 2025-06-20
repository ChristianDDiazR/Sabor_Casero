const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/buscar', recipeController.buscarRecipe);

router.get('/categorias', recipeController.getCategorias);

// Obtener todas las recetas
router.get('/', recipeController.getRecipes);

// Obtener receta por ID
router.get('/:id', recipeController.getRecipeById);

module.exports = router;
