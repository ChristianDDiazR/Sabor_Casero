const mc = require('../config/db');

const Usuario = {
    crear: (usuario, callback) => {
        const query = `INSERT INTO USUARIO (nombre_usuario, edad, descripcion, contacto, mail, password, foto_perfil)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        mc.query(query, [
            usuario.nombre_usuario,
            usuario.edad,
            usuario.descripcion,
            usuario.contacto,
            usuario.mail,
            usuario.password,
            usuario.foto_perfil
        ], callback);
    },

    buscarPorMail: (mail, callback) => {
        const query = `SELECT * FROM USUARIO WHERE mail = ?`;
        
        mc.query(query, [mail], callback);
    },

    buscarPorId: (id, callback) => {
    const query = `SELECT * FROM USUARIO WHERE id_usuario = ?`;
    mc.query(query, [id], callback);
}


};

module.exports = Usuario;