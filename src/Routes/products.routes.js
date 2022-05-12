var express = require("express");
var router = express.Router();
const { body } = require('express-validator');
const productController = require("../Controllers/products.controllers");
const multer = require('multer');
const { path } = require('../../app');
// const path = require('path');
const pathh = require('path');

const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null,pathh.join(__dirname, '../../public/images/users'))
    },
    filename: (req,file,cb) => {
        const newFileName = 'user-'+ Date.now() + pathh.extname(file.originalname);
        cb(null, newFileName);
    }
})
const upload = multer({storage});

/* GET Listado de productos. */
router.get("/", productController.list);

/* GET Info producto especifico. */
router.get("/info/:id", productController.detalle);
//router.get("/info/:id", productController.) // http://localhost:4000/productos/info/2
router.get("/info", productController.list);

/*Crear producto nuevo.*/
router.get("/crear", productController.crear);
router.post("/crear-producto", productController.agregar); 

/* Editar productos */ 
router.get("/:id/edit",productController.edit);
router.post("/:id",productController.edit);

/* Borrar producto */
router.get("/:id/delete", productController.delete);
router.delete('/producto', productController.delete);

module.exports = router;
