const express = require('express');
const router = express.Router();
const productsAPIController = require('../../Controllers/api/productsApiController');
const cors = require('cors')


router.use(cors());

/*Lista de productos*/
router.get('/', productsAPIController.list);

/*Detalle de cada curso*/
router.get('/info/:id', productsAPIController.detail);

/*Lista de productos por categoria*/
router.get('/categorias/', productsAPIController.categorias);



module.exports = router;