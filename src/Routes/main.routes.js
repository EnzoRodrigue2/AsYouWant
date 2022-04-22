var express = require('express');
var router = express.Router();
const mainController = require('../Controllers/main.controllers')

/* GET home page. */
router.get('/', mainController.home);
router.get('/carrito', mainController.carrito);
router.get('/home', mainController.homeUser);

module.exports = router;
