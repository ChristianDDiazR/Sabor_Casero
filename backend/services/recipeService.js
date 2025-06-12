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

// Exportar todas las funciones
module.exports = {
  obtenerRecipes,
  obtenerRecipePorId,
  buscarRecipesPorNombre,
  obtenerCategorias,
  buscarRecipesPorFiltros // 👈 Exportamos la nueva función aquí
};