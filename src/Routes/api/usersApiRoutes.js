const express = require('express');
const router = express.Router();
const usersController = require('../../Controllers/api/usersApiController');

/*Lista de usuarios*/
router.get('/', usersController.list);

/*Detalle de cada usuario*/
router.get('/:id', usersController.detail);

module.exports = router;