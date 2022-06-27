const express = require('express');
const router = express.Router();
const usersController = require('../../Controllers/api/usersApiController');
const cors = require('cors');

router.use(cors());

/*Lista de usuarios*/
router.get('/', usersController.list);

/*Detalle de cada usuario*/
router.get('/detail/:id', usersController.detail);

/*Lista de categorias de usuarios*/
router.get('/categorias', usersController.category);

/*Detalle de cada categoria*/
router.get('/categorias/:id', usersController.detCategory)

module.exports = router;