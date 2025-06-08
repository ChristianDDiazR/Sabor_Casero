const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'clave_super_secreta_sabor_casero';

exports.registrar = (req, res) => {
    const { nombre_usuario, edad, descripcion, contacto, mail, contraseña, foto_perfil } = req.body;

    bcrypt.hash(contraseña, 10, (err, hash) => {
        if (err) return res.status(500).json({ mensaje: 'Error al encriptar contraseña' });

        Usuario.crear({
            nombre_usuario,
            edad,
            descripcion,
            contacto,
            mail,
            contraseña: hash,
            foto_perfil
        }, (err, resultado) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ mensaje: 'El correo ya está registrado' });
                }
                return res.status(500).json({ mensaje: 'Error al registrar usuario', error: err });
            }

            res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
        });
    });
};

exports.login = (req, res) => {
    const { mail, contraseña } = req.body;

    Usuario.buscarPorMail(mail, (err, resultados) => {
        if (err || resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Correo no encontrado' });
        }

        const usuario = resultados[0];

        bcrypt.compare(contraseña, usuario.contraseña, (err, coincide) => {
            if (!coincide) {
                return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                { id_usuario: usuario.id_usuario, mail: usuario.mail },
                SECRET_KEY,
                { expiresIn: '2h' }
            );

            res.json({
                mensaje: 'Login exitoso',
                token,
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nombre_usuario: usuario.nombre_usuario,
                    mail: usuario.mail,
                    foto_perfil: usuario.foto_perfil
                }
            });
        });
    });
};
