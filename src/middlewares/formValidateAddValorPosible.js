// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [

    body('denominacion_valor').notEmpty().withMessage('Completá la descripcion').bail(),
    body('id_ayuda').notEmpty().withMessage('no se encontró la id de la ayuda').bail(),
    body('valor').notEmpty().withMessage('el valor no puede estar vacío'),
    body('imagen').custom((value, { req }) => {
        // Obtengo el archivo
        let file = req.file; 
        // Defino que extensiones son válidas
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file) {
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error ('Las extensiones de imágenes permitidas son .jpg, .png y .gif')
            }
        }
        // Siempre en las validaciones custom retorno true
        return true;
    })
    
]