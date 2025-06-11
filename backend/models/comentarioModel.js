const mc = require('../config/db');

const Comentario = {
    crearComentario: function(datos, callback) {
        mc.query("INSERT INTO COMENTARIO SET ?", datos, callback);
    },
    editarComentario: function(id, datos, callback) {
        mc.query("UPDATE COMENTARIO SET ? WHERE id_comentario = ?", [datos, id], callback);
    },
    eliminarComentario: function(id, callback) {
        mc.query("DELETE FROM COMENTARIO WHERE id_comentario = ?", id, callback);
    },
    obtenerComentarioPorId: function(id, callback) {
        mc.query("SELECT * FROM COMENTARIO WHERE id_comentario = ?", id, callback);
    },
    obtenerTodosLosComentarios: function(callback) {
        mc.query("SELECT * FROM COMENTARIO", callback);
    },
    obtenerComentariosPorReceta: function(id_receta, callback) {
       const sql = `
        SELECT 
            c.id_comentario,
            c.id_usuarioComentario,
            c.id_recetaComentario,
            c.Comentario,
            c.id_comentarioPadre,
            c.Fecha_publicacion,
            u.nombre_usuario AS nombreUsuario
        FROM comentario c
        JOIN usuario u ON c.id_usuarioComentario = u.id_usuario
        WHERE c.id_recetaComentario = ?`;
       mc.query(sql, id_receta, callback);
    }
};

module.exports = Comentario;
