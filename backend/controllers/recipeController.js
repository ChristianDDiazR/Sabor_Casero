const recipeService = require('../services/recipeService');

exports.getRecipes = (req, res) => {
  recetaService.obtenerRecipes((err, results) => {
    if (err) {
      console.error('Error al obtener recetas:', err);
      res.status(500).json({ error: 'Error al obtener recetas' });
    } else {
      res.json(results);
    }
  });
};

