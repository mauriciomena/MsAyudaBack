const express = require("express");
const router = express.Router();

//const menuController = require("../../Controllers/menuController")
const menuController = require('../Controllers/menuController')
const uploadFileProducts = require('../middlewares/multerMiddlewareImagenes')
const uploadFileDocs = require('../middlewares/multerMiddlewareDocs')
const formValidationsImages = require('../middlewares/formValidationsImages')
const formAddDocumentsMiddleware = require('../middlewares/formAddDocumentsMiddleware')



// Rutas
router.get("/buscar", menuController.findEventos);
router.get("/", menuController.list);
router.get("/:id", menuController.findOption);
router.get("/evento/:id", menuController.getValores);


router.post('/upfilevaloresposibles', uploadFileProducts.single('imagen'), formValidationsImages, menuController.upImagenValoresPosibles);
router.post('/adddocumentos', uploadFileDocs.single('documento'), formAddDocumentsMiddleware, menuController.addDocumentos);



module.exports = router;