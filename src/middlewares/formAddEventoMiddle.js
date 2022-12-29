// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('titulo').notEmpty().withMessage('Completá titulo').bail(),
    body('descripcion').notEmpty().withMessage('completa la descripcion').bail(),
    body('etiquetas').notEmpty().withMessage('la etiqueta no puede estar vacía'),
    body('tipo').notEmpty().withMessage('el tipo no puede estar vacío'),    
]