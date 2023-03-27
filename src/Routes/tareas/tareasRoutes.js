const express = require("express");
const router = express.Router();
//const tareasController = require("../Controllers/tareasController")
const tareasController = require("../../Controllers/tareasController")

// Rutas
router.post("/senasa",tareasController.senasa );
router.get("/", tareasController.list);
router.get("/articulos", tareasController.art);
//router.post("/senasa", tareasController.senasa);



module.exports = router;