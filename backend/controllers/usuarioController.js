const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'clave_super_secreta_sabor_casero';

exports.registrar = (req, res) => {
    const { nombre_usuario, edad, descripcion, contacto, mail, password, foto_perfil } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ mensaje: 'Error al encriptar password' });

        Usuario.crear({
            nombre_usuario,
            edad,
            descripcion,
            contacto,
            mail,
            password: hash,
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
    const { mail, password } = req.body;

    Usuario.buscarPorMail(mail, (err, resultados) => {
        if (err || resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Correo no encontrado' });
        }

        const usuario = resultados[0];

        bcrypt.compare(password, usuario.password, (err, coincide) => {
            if (!coincide) {
                return res.status(401).json({ mensaje: 'password incorrecta' });
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
