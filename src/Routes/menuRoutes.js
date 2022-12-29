const express = require("express");
const router = express.Router();

//const menuController = require("../../Controllers/menuController")
const menuController = require('../Controllers/menuController')
const uploadFileProducts = require('../middlewares/multerMiddlewareImagenes')
const uploadFileDocs = require('../middlewares/multerMiddlewareDocs')
const formValidationsImages = require('../middlewares/formValidationsImages')
const formAddDocumentsMiddleware = require('../middlewares/formAddDocumentsMiddleware');
const formValidateAddValorPosible = require("../middlewares/formValidateAddValorPosible");
const formAddEventoMiddle = require("../middlewares/formAddEventoMiddle");
 


// Rutas
router.post("/buscar", menuController.findEventos);
router.get("/buscomenu", menuController.listTreeMenu);
router.get("/catalogo", menuController.catalog);
router.get("/", menuController.list);
router.get("/:id", menuController.findOption);
router.get("/evento/:id", menuController.getValores);

router.post('/upfilevaloresposibles', uploadFileProducts.single('imagen'), formValidationsImages, menuController.upImagenValoresPosibles);
router.post('/addvalorposilble',uploadFileProducts.single('imagen'), formValidateAddValorPosible, menuController.addValorPosible);
router.post('/delvalorposilble', menuController.deleteValorPosible);
router.post('/adddocumentos', uploadFileDocs.single('documento'), formAddDocumentsMiddleware, menuController.addDocumentos);
router.post('/addevento', formAddEventoMiddle, menuController.addEventos);
router.post('/vinculadocmenu',menuController.vinculaDocConMenu);

module.exports = router;    