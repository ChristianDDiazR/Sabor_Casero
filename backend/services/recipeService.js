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
  db.query(query, [id_usuario], callback);
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

// Exportar todas las funciones
module.exports = {
  obtenerRecipes,
  obtenerRecipePorId,
  buscarRecipesPorNombre,
  obtenerCategorias,
  buscarRecipesPorFiltros, // 👈 Exportamos la nueva función aquí
  haDadoLike,
  darLike,
  quitarLike,
  obtenerFavoritosPorUsuario
};