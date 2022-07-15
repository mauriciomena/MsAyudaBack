const express = require("express");
const router = express.Router();

//const menuController = require("../../Controllers/menuController")
const menuController = require('../Controllers/menuController')

// Rutas
router.get("/", menuController.list);
router.get("/:id", menuController.findOption);
router.get("/evento/:id", menuController.getValores);


module.exports = router;