const db = require('../config/db');

// Obtener todas las recetas
const obtenerRecipes = (callback) => {
  const query = `
    SELECT r.*, u.nombre_usuario, c.nombre_categoria 
    FROM RECETA r
    JOIN USUARIO u ON r.id_usuarioReceta = u.id_usuario
    JOIN CATEGORIA c ON r.id_categoria = c.id_categoria
  `;
  db.query(query, callback);
};

// Obtener receta por ID
const obtenerRecipePorId = (id, callback) => {
  const query = `
    SELECT r.*, u.nombre_usuario, c.nombre_categoria 
    FROM RECETA r
    JOIN USUARIO u ON r.id_usuarioReceta = u.id_usuario
    JOIN CATEGORIA c ON r.id_categoria = c.id_categoria
    WHERE r.id_receta = ?
  `;
  db.query(query, [id], callback);
};

// Buscar recetas por nombre
const buscarRecipesPorNombre = (texto, callback) => {
  const query = `
    SELECT r.*, u.nombre_usuario, c.nombre_categoria 
    FROM RECETA r
    JOIN USUARIO u ON r.id_usuarioReceta = u.id_usuario
    JOIN CATEGORIA c ON r.id_categoria = c.id_categoria
    WHERE LOWER(r.nombre_receta) LIKE LOWER(?)
  `;
  db.query(query, [`%${texto}%`], callback);
};

// Obtener categorías desde base de datos
const obtenerCategorias = (callback) => {
  const query = `
    SELECT id_categoria, nombre_categoria 
    FROM CATEGORIA
  `;
  db.query(query, callback);
};
//DAR ME GUSTA-------------------------
// Verificar si un usuario ya dio like a una receta
const haDadoLike = (id_usuario, id_receta, callback) => {
  const query = 'SELECT * FROM ME_GUSTA WHERE id_usuario = ? AND id_receta = ?';
  db.query(query, [id_usuario, id_receta], callback);
};

// Dar me gusta
const darLike = (id_usuario, id_receta, callback) => {
  const queryInsert = 'INSERT INTO ME_GUSTA (id_usuario, id_receta) VALUES (?, ?)';
  db.query(queryInsert, [id_usuario, id_receta], (err, result) => {
    if (err) return callback(err);

    // Actualizar contador en RECETA
    const queryUpdate = 'UPDATE RECETA SET me_gusta = me_gusta + 1 WHERE id_receta = ?';
    db.query(queryUpdate, [id_receta], callback);
  });
};

// Quitar me gusta
const quitarLike = (id_usuario, id_receta, callback) => {
  const queryDelete = 'DELETE FROM ME_GUSTA WHERE id_usuario = ? AND id_receta = ?';
  db.query(queryDelete, [id_usuario, id_receta], (err, result) => {
    if (err) return callback(err);

    // Disminuir contador
    const queryUpdate = 'UPDATE RECETA SET me_gusta = me_gusta - 1 WHERE id_receta = ?';
    db.query(queryUpdate, [id_receta], callback);
  });
};

// Obtener recetas favoritas de un usuario
const obtenerFavoritosPorUsuario = (id_usuario, callback) => {
  const query = `
    SELECT r.*, u.nombre_usuario, c.nombre_categoria 
    FROM RECETA r
    JOIN ME_GUSTA mg ON r.id_receta = mg.id_receta
    JOIN USUARIO u ON r.id_usuarioReceta = u.id_usuario
    JOIN CATEGORIA c ON r.id_categoria = c.id_categoria
    WHERE mg.id_usuario = ?
  `;
  //db.query(query, [id_usuario], callback);
  db.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);

    // ✅ Convertir imágenes a base64
    const favoritosConImagen = results.map(receta => {
      if (receta.imagen && Buffer.isBuffer(receta.imagen)) {
        receta.imagen = receta.imagen.toString('base64');
      }
      return receta;
    });

    callback(null, favoritosConImagen);
  });
};
//DAR ME GUSTA-------------------------

// 🔥 Nueva función: buscar por filtros múltiples (search y/o category)
const buscarRecipesPorFiltros = (filtros, callback) => {
  let query = `
    SELECT r.*, u.nombre_usuario, c.nombre_categoria 
    FROM RECETA r
    JOIN USUARIO u ON r.id_usuarioReceta = u.id_usuario
    JOIN CATEGORIA c ON r.id_categoria = c.id_categoria
    WHERE 1=1
  `;

  const params = [];

  if (filtros.search) {
    query += ' AND LOWER(r.nombre_receta) LIKE LOWER(?)';
    params.push(`%${filtros.search}%`);
  }

  if (filtros.category) {
    query += ' AND r.id_categoria = ?';
    params.push(filtros.category);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return callback(err, null);
    }

    // Convertir imágenes a Base64
    const recipesWithImages = results.map(recipe => {
      if (recipe.imagen) {
        recipe.imagen = Buffer.from(recipe.imagen).toString('base64');
      }
      return recipe;
    });

    callback(null, recipesWithImages);
  });
};

// Agregar receta
const agregarRecipe = (data, callback) => {
  const query = `
    INSERT INTO RECETA (
      id_usuarioReceta,
      nombre_receta,
      descripcion,
      Fecha_publicacion,
      Calificacion,
      id_categoria,
      imagen
    ) VALUES (?, ?, ?, NOW(), ?, ?, ?)
  `;
  // Convertir base64 a Buffer si se proporciona imagen
  let imagenBuffer = null;
  if (data.imagen) {
    // Asumimos que viene como "data:image/jpeg;base64,..."
    // Extraer solo la parte base64 si es una URL de datos completa
    const base64Data = data.imagen.replace(/^data:image\/\w+;base64,/, '');
    imagenBuffer = Buffer.from(base64Data, 'base64'); // Convertir a Buffer binario
  }

  const params = [
    data.id_usuarioReceta,
    data.nombre_receta,
    data.descripcion,
    data.calificacion,
    data.id_categoria,
    imagenBuffer // Pasar el Buffer o null
  ];
  db.query(query, params, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.insertId);
  });
};

// Editar receta
const editarRecipe = (id, data, callback) => {
  const query = `
    UPDATE RECETA 
    SET 
      nombre_receta = ?,
      descripcion = ?,
      Calificacion = ?,
      id_categoria = ?,
      imagen = ?
    WHERE id_receta = ?
  `;
  // Convertir base64 a Buffer si se proporciona imagen
  let imagenBuffer = null;
  if (data.imagen) {
    // Extraer solo la parte base64 si es una URL de datos completa
    const base64Data = data.imagen.replace(/^data:image\/\w+;base64,/, '');
    imagenBuffer = Buffer.from(base64Data, 'base64'); // Convertir a Buffer binario
  }

  const params = [
    data.nombre_receta,
    data.descripcion,
    data.calificacion,
    data.id_categoria,
    imagenBuffer, // Pasar el Buffer o null
    id
  ];
  db.query(query, params, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.affectedRows > 0);
  });
};

// Eliminar receta
const eliminarRecipe = (id, callback) => {
  const query = `
    DELETE FROM RECETA 
    WHERE id_receta = ?
  `;

  db.query(query, [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.affectedRows > 0); // Devuelve true si se eliminó algo
  });
};

const obtenerRecipesPorUsuario = (idUsuario, callback) => {
  const query = `
    SELECT r.*, u.nombre_usuario, c.nombre_categoria 
    FROM RECETA r
    JOIN USUARIO u ON r.id_usuarioReceta = u.id_usuario
    JOIN CATEGORIA c ON r.id_categoria = c.id_categoria
    WHERE r.id_usuarioReceta = ?
    ORDER BY r.Fecha_publicacion DESC
  `;

  db.query(query, [idUsuario], (err, results) => {
    if (err) return callback(err, null);

    // Convertir imágenes a Base64
    const recipesWithImages = results.map(recipe => {
      if (recipe.imagen && Buffer.isBuffer(recipe.imagen)) {
        recipe.imagen = recipe.imagen.toString('base64');
      }
      return recipe;
    });

    callback(null, recipesWithImages);
  });
};


// Exportar todas las funciones
module.exports = {
  obtenerRecipes,
  obtenerRecipePorId,
  buscarRecipesPorNombre,
  obtenerCategorias,
  buscarRecipesPorFiltros,
  agregarRecipe,
  editarRecipe,
  eliminarRecipe,
  obtenerRecipesPorUsuario,
  buscarRecipesPorFiltros, // 👈 Exportamos la nueva función aquí
  haDadoLike,
  darLike,
  quitarLike,
  obtenerFavoritosPorUsuario

};