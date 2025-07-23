const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const verificarToken = require('../middleware/authMiddleware');
console.log('🧪 verificarLike existe:', typeof recipeController.verificarLike);
router.get('/buscar', recipeController.buscarRecipe);
router.get('/categorias', recipeController.getCategorias);
router.get('/favoritos/:id_usuario', verificarToken, recipeController.obtenerFavoritosPorUsuario);
router.get('/:id/like', verificarToken, recipeController.verificarLike); // Verifica estado
router.post('/:id/like', verificarToken, recipeController.darLike);
router.delete('/:id/like', verificarToken, recipeController.quitarLike);
// Obtener receta por ID
router.get('/:id', recipeController.getRecipeById);
// Obtener todas las recetas
router.get('/', recipeController.getRecipes);






module.exports = router;

