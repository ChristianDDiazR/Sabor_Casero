const recipeService = require('../services/recipeService');

exports.getRecipes = (req, res) => {
  recipeService.obtenerRecipes((err, results) => {
    if (err) {
      console.error('Error al obtener recetas:', err);
      res.status(500).json({ error: 'Error al obtener recetas' });
    } else {
      // Convertir imágenes en base64
      const recipesWithImages = results.map(recipe => {
        if (recipe.imagen) {
          recipe.imagen = Buffer.from(recipe.imagen).toString('base64');
        }
        return recipe;
      });

      res.json(recipesWithImages);
    }
  });
};

