// Modulos del Middleware
const path = require('path');
const multer = require('multer');

// Configuración Multer
const storage = multer.diskStorage({

	destination: (req, file, cb) => {
		cb(null, './public/images');
	},

	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	}
});

const uploadFile = multer({ storage });

module.exports = uploadFile;