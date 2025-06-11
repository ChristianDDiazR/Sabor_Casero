const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// GET /api/recetas
router.get('/', recipeController.getRecipes);

module.exports = router;
