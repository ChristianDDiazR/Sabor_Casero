const mc = require('../config/db');

const Usuario = {
    crear: (usuario, callback) => {
        const query = `INSERT INTO USUARIO (nombre_usuario, edad, descripcion, contacto, mail, contraseña, foto_perfil)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        mc.query(query, [
            usuario.nombre_usuario,
            usuario.edad,
            usuario.descripcion,
            usuario.contacto,
            usuario.mail,
            usuario.contraseña,
            usuario.foto_perfil
        ], callback);
    },

    buscarPorMail: (mail, callback) => {
        const query = `SELECT * FROM USUARIO WHERE mail = ?`;
        
        mc.query(query, [mail], callback);
    }
};

module.exports = Usuario;