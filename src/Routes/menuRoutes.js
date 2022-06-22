const express = require("express");
const router = express.Router();

//const menuController = require("../../Controllers/menuController")
const menuController = require('../Controllers/menuController')

// Rutas
router.get("/", menuController.list);
//router.get("/:id", menuController.opcion);


module.exports = router;