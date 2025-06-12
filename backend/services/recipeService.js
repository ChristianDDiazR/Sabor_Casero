const db = require('../config/db');

const obtenerRecipes = (callback) => {
  const query = `
    SELECT r.*, u.nombre_usuario, c.nombre_categoria 
    FROM RECETA r
    JOIN USUARIO u ON r.id_usuarioReceta = u.id_usuario
    JOIN CATEGORIA c ON r.id_categoria = c.id_categoria
  `;
  db.query(query, callback);
};

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

module.exports = {
  obtenerRecipes,
  obtenerRecipePorId, // 👈 Agrega esta línea también aquí
};

