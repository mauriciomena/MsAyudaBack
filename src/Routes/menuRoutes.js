const express = require("express");
const router = express.Router();

//const menuController = require("../../Controllers/menuController")
const menuController = require('../Controllers/menuController')
const uploadFileProducts = require('../middlewares/multerMiddlewareImagenes')
const formValidationsImages = require('../middlewares/formValidationsImages')



// Rutas
router.get("/", menuController.list);
router.get("/:id", menuController.findOption);
router.get("/evento/:id", menuController.getValores);
// Guarda el nuevo producto Create (productCart.html)
router.post('/upfilevaloresposibles', uploadFileProducts.single('imagen'), formValidationsImages, menuController.upImagenValoresPosibles);



module.exports = router;