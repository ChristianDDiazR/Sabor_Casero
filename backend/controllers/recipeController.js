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
//DAR ME GUSTA------------------------------
// Dar like a una receta
exports.darLike = (req, res) => {
  const id_receta = req.params.id;
  const id_usuario = req.usuario.id_usuario; // Viene del middleware JWT

  recipeService.haDadoLike(id_usuario, id_receta, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al verificar like' });

    if (results.length > 0) {
      return res.status(400).json({ mensaje: 'Ya diste like a esta receta' });
    }

    recipeService.darLike(id_usuario, id_receta, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al dar like' });
      }
      res.json({ mensaje: 'Like agregado', me_gusta: true });
    });
  });
};

// Quitar like
exports.quitarLike = (req, res) => {
  const id_receta = req.params.id;
  const id_usuario = req.usuario.id_usuario;

  recipeService.haDadoLike(id_usuario, id_receta, (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ mensaje: 'No has dado like a esta receta' });
    }

    recipeService.quitarLike(id_usuario, id_receta, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al quitar like' });
      }
      res.json({ mensaje: 'Like eliminado', me_gusta: false });
    });
  });
};

// Verificar si el usuario ya dio like
exports.verificarLike = (req, res) => {
  const id_receta = req.params.id;
  const id_usuario = req.usuario?.id_usuario || null;

  if (!id_usuario) {
    return res.json({ me_gusta: false }); // No logueado → sin like
  }

  recipeService.haDadoLike(id_usuario, id_receta, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al verificar like' });
    }
    res.json({ me_gusta: results.length > 0 });
  });
};

exports.obtenerFavoritosPorUsuario = (req, res) => {
  const id_usuario = req.params.id_usuario;

  // Pero asegúrate de que el usuario del token sea el mismo que consulta
  if (req.usuario.id_usuario !== parseInt(id_usuario)) {
    return res.status(403).json({ mensaje: 'Acceso denegado' });
  }

  recipeService.obtenerFavoritosPorUsuario(id_usuario, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener favoritos' });
    }
    res.json(results);
  });
};

exports.crearRecipe = (req, res) => {
  const { id_usuarioReceta, nombre_receta, descripcion, calificacion, id_categoria, imagen } = req.body;

  if (!id_usuarioReceta || !nombre_receta || !descripcion || !id_categoria) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  recipeService.agregarRecipe(
    {
      id_usuarioReceta,
      nombre_receta,
      descripcion,
      calificacion: calificacion || 0,
      id_categoria,
      imagen
    },
    (err, recipeId) => {
      if (err) {
        console.error('Error al crear receta:', err);
        return res.status(500).json({ error: 'Error al crear receta' });
      }

      recipeService.obtenerRecipePorId(recipeId, (err, result) => {
        if (err || !result.length) {
          // Si no podemos traerla, devolvemos solo el ID
          return res.status(201).json({ id_receta: recipeId, mensaje: 'Receta creada', ...req.body });
        }
        const receta = result[0];
        if (receta.imagen) {
          receta.imagen = Buffer.from(receta.imagen).toString('base64');
        }
        res.status(201).json(receta); // ✅ Devuelve toda la receta con ID y Base64
      });
    }
  );
};

exports.editarRecipe = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const { nombre_receta, descripcion, calificacion, id_categoria, imagen } = req.body;

  // Validar campos obligatorios
  if (!nombre_receta || !descripcion || !id_categoria) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  recipeService.editarRecipe(
    id,
    {
      nombre_receta,
      descripcion,
      calificacion,
      id_categoria,
      imagen
    },
    (err, updated) => {
      if (err) {
        console.error('Error al editar receta:', err);
        return res.status(500).json({ error: 'Error al editar receta' });
      }

      if (!updated) {
        return res.status(404).json({ mensaje: 'Receta no encontrada' });
      }

      
      recipeService.obtenerRecipePorId(id, (err, result) => {
        if (err || !result.length) {
          return res.status(200).json({ mensaje: 'Receta actualizada, pero no se pudo obtener los datos' });
        }
        const receta = result[0];
        if (receta.imagen) {
          receta.imagen = Buffer.from(receta.imagen).toString('base64');
        }
        res.json(receta);
      });
    }
  );
};

exports.eliminarRecipe = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  recipeService.eliminarRecipe(id, (err, deleted) => {
    if (err) {
      console.error('Error al eliminar receta:', err);
      return res.status(500).json({ error: 'Error al eliminar receta' });
    }

    if (!deleted) {
      return res.status(404).json({ mensaje: 'Receta no encontrada' });
    }

    res.json({ mensaje: 'Receta eliminada exitosamente' });
  });
};



exports.getRecipesByUser = (req, res) => {
  const idUsuario = req.query.id_usuario;

  // Validar que se envíe el ID
  if (!idUsuario || isNaN(idUsuario)) {
    return res.status(400).json({ error: 'ID de usuario inválido o faltante' });
  }

  recipeService.obtenerRecipesPorUsuario(idUsuario, (err, results) => {
    if (err) {
      console.error('Error al obtener recetas del usuario:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(results);
  });
};


