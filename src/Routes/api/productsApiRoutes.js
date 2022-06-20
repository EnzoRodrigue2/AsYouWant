const express = require('express');
const router = express.Router();
const productsController = require('../../Controllers/api/productsApiController');


/*Lista de productos*/
router.get('/', productsController.list);

/*Lista de productos por categoria*/
router.get('/:categoria', productsController.categoria);

/*Detalle de cada curso*/
router.get('/:id', productsController.detail);

module.exports = router;