var express = require('express');
var router = express.Router();
const mainController = require('../Controllers/main.controllers');
const userIsLogged = require('../middlewares/userIsLogged');

/* GET home page. */
router.get('/', mainController.home);
router.get('/carrito', mainController.carrito);
router.get('/homeUser', userIsLogged, mainController.homeUser);

module.exports = router;
