var express = require("express");
var router = express.Router();
const productController = require("../Controllers/products.controllers");

/* GET Listado de productos. */
//router.get("/", productController.list);

/* GET Info producto especifico. */
router.get("/info/:id", productController.detalle);
//router.get("/info/:id", productController.) // http://localhost:4000/productos/info/2
router.get("/info", productController.list);

/*Crear producto nuevo.*/
router.get("/crear", productController.crear);
/* router.post("/", productController.list); no estoy segura si está correcta

/* Editar productos */ 
router.get("/:id/edit",productController.edit);
router.post("/:id",productController.edit);

/* Borrar producto */
router.get("/:id/delete", productController.delete);
router.delete('/producto', productController.delete);

module.exports = router;
