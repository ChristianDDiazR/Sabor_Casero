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

exports.getRecipeById = (req, res) => {
  const id = req.params.id;
  recipeService.obtenerRecipePorId(id, (err, result) => {
    if (err) {
      console.error('Error al obtener receta por ID:', err);
      res.status(500).json({ error: 'Error al obtener receta' });
    } else if (!result.length) {
      res.status(404).json({ mensaje: 'Receta no encontrada' });
    } else {
      // Convertir imagen a base64 si existe
      const receta = result[0];
      if (receta.imagen) {
        receta.imagen = Buffer.from(receta.imagen).toString('base64');
      }
      res.json(receta);
    }
  });
};

exports.buscarRecipe = (req, res) => {
  const texto = req.query.search?.trim() || '';

  if (!texto) {
    return res.status(400).json({ error: 'Debe proporcionar un texto de búsqueda' });
  }

  console.log("Texto recibido:", texto);

  recipeService.buscarRecipesPorNombre(texto, (err, results) => {
    if (err) {
      console.error('Error al buscar recetas:', err);
      res.status(500).json({ error: 'Error al buscar recetas' });
    } else {
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


