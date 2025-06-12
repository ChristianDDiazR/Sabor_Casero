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
  const { search, category } = req.query;

  // Si no hay ningún filtro, devolver todas las recetas
  if (!search && !category) {
    return recipeService.getAllRecipes((err, results) => {
      if (err) {
        console.error('Error al obtener recetas:', err);
        return res.status(500).json({ error: 'Error al obtener recetas' });
      }
      return res.json(results);
    });
  }

  // Si hay filtros, usar la función de buscar con filtros
  recipeService.buscarRecipesPorFiltros({ search, category }, (err, results) => {
    if (err) {
      console.error('Error al buscar recetas:', err);
      return res.status(500).json({ error: 'Error al buscar recetas' });
    }
    return res.json(results);
  });
};

exports.getCategorias = (req, res) => {
  recipeService.obtenerCategorias((err, results) => {
    if (err) {
      console.error('Error al obtener categorías:', err);
      res.status(500).json({ error: 'Error al obtener categorías' });
    } else {
      res.json(results);
    }
  });
};


