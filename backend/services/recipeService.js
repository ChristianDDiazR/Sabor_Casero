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
  
  // Si no hay imagen, enviar NULL
  const params = [
    data.id_usuarioReceta,
    data.nombre_receta,
    data.descripcion,
    data.calificacion,
    data.id_categoria,
    data.imagen || null
  ];

  db.query(query, params, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.insertId); // Devuelve el ID de la receta creada
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

  const params = [
    data.nombre_receta,
    data.descripcion,
    data.calificacion,
    data.id_categoria,
    data.imagen || null, // Si no hay imagen, deja NULL
    id
  ];

  db.query(query, params, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result.affectedRows > 0); // Devuelve true si se actualizó algo
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

// Exportar todas las funciones
module.exports = {
  obtenerRecipes,
  obtenerRecipePorId,
  buscarRecipesPorNombre,
  obtenerCategorias,
  buscarRecipesPorFiltros,
  agregarRecipe,
  editarRecipe,
  eliminarRecipe
};