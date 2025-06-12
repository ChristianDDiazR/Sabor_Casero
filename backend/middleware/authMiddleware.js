const jwt = require('jsonwebtoken');
const SECRET_KEY = 'clave_super_secreta_sabor_casero';

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Token no enviado' });
    }

    const token = authHeader.split(' ')[1]; // Quitar "Bearer "
    jwt.verify(token, SECRET_KEY, (err, usuarioDecodificado) => {
        if (err) return res.status(403).json({ mensaje: 'Token inválido' });

        req.usuario = usuarioDecodificado;
        next();
    });
}

module.exports = verificarToken;
