const { 
    crearComentario, 
    editarComentario, 
    eliminarComentario, 
    obtenerTodosLosComentarios, 
    obtenerComentariosPorReceta 
} = require('../services/comentarioService');

const postComentario = async (req, res) => {
    const { id_usuarioComentario, id_recetaComentario, Comentario, id_comentarioPadre } = req.body;

    const datos = {
        id_usuarioComentario,
        id_recetaComentario,
        Comentario,
        id_comentarioPadre: id_comentarioPadre || null
    };

    try {
        await crearComentario(datos);
        return res.status(201).json({ mensaje: "Comentario creado" });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const putComentario = async (req, res) => {
    const id = req.params.id;
    const datos = req.body;

    try {
        await editarComentario(id, datos);
        return res.status(200).json({ mensaje: `Comentario con id=${id} actualizado` });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteComentario = async (req, res) => {
    const id = req.params.id;

    try {
        await eliminarComentario(id);
        return res.status(200).json({ mensaje: `Comentario con id=${id} eliminado` });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getComentarios = async (req, res) => {
    try {
        const comentarios = await obtenerTodosLosComentarios();
        return res.status(200).json(comentarios);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

// 🔥 Nuevo: Obtener comentarios por receta
const getComentariosPorReceta = async (req, res) => {
    const id_receta = req.params.id;

    try {
        const comentarios = await obtenerComentariosPorReceta(id_receta);
        return res.status(200).json(comentarios);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = { 
    postComentario, 
    putComentario, 
    deleteComentario, 
    getComentarios, 
    getComentariosPorReceta 
};
