const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const verificarToken = require('../middleware/authMiddleware');

router.post('/registro', usuarioController.registrar);
router.post('/login', usuarioController.login);
router.get('/perfil', verificarToken, usuarioController.perfilUsuario);

module.exports = router;
