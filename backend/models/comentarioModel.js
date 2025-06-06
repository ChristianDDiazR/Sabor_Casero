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
        mc.query("SELECT * FROM COMENTARIO WHERE id_recetaComentario = ?", id_receta, callback);
    }
};

module.exports = Comentario;
