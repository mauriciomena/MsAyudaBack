// Modulos requeridos
const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('documento').custom((value, { req }) => {
        // Obtengo el archivo
        let file = req.file; 

        // Defino que extensiones son válidas
        let acceptedExtensions = ['.pdf'];
        
        if (!file) {
            throw new Error('solo se admiten documentos en pdf');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error ('Las extensiones de imágenes permitidas son .pdf')
            }
        }
        // Siempre en las validaciones custom retorno true
        return true;
    })
]