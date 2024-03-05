const express = require("express");
const router = express.Router();
//const tareasController = require("../Controllers/tareasController")
const tareasController = require("../../Controllers/tareasController")

// Rutas
router.get("/", tareasController.info);
router.post("/", tareasController.art);
router.patch("/", tareasController.art);
router.delete("/", tareasController.art);

module.exports = router;