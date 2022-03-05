var express = require("express");
var router = express.Router();
const productController = require("../Controllers/products.controllers");

/* GET Listado de productos. */
//router.get("/", productController.list);

/* GET Info producto especifico. */
router.get("/info/:id", productController.detalle);
//router.get("/info/:id", productController.) // http://localhost:4000/productos/info/2
router.get("/info", productController.list);

module.exports = router;
