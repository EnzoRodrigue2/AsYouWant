const express = require('express');
const router = express.Router();
const productsController = require('../../Controllers/api/productsApiController');
const cors = require('cors')


router.use(cors());

/*Lista de productos*/
router.get('/', productsController.list);

/*Detalle de cada curso*/
router.get('/info/:id', productsController.detail);

/*Lista de productos por categoria*/
router.get('/categoria/:categoria', productsController.categoria);



module.exports = router;