const Comentario = require('../models/comentarioModel');

const crearComentario = async (datos) => {
    return new Promise((resolve, reject) => {
        Comentario.crearComentario(datos, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};

const editarComentario = async (id, datos) => {
    return new Promise((resolve, reject) => {
        Comentario.editarComentario(id, datos, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};

const eliminarComentario = async (id) => {
    return new Promise((resolve, reject) => {
        Comentario.eliminarComentario(id, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};

const obtenerTodosLosComentarios = async () => {
    return new Promise((resolve, reject) => {
        Comentario.obtenerTodosLosComentarios((error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const obtenerComentariosPorReceta = async (id_receta) => {
    return new Promise((resolve, reject) => {
        Comentario.obtenerComentariosPorReceta(id_receta, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = { 
    crearComentario, 
    editarComentario, 
    eliminarComentario, 
    obtenerTodosLosComentarios, 
    obtenerComentariosPorReceta 
};

