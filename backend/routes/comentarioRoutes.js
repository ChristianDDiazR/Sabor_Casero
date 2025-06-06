// routes/comentarioRoutes.js
const express = require('express');
const router = express.Router();
const { 
    postComentario, 
    putComentario, 
    deleteComentario,
    getComentarios,
    getComentariosPorReceta
 } = require('../controllers/comentarioController');

router.post('/realizarComentario', postComentario);
router.put('/editarComentario/:id', putComentario);
router.delete('/borrarComentario/:id', deleteComentario);
router.get('/obtenerComentarios', getComentarios);
router.get('/obtenerComentarios/receta/:id', getComentariosPorReceta)

module.exports = router;