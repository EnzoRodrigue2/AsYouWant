var express = require('express');
var router = express.Router();
const mainController = require('../Controllers/main.controllers');
const userIsLogged = require('../middlewares/userIsLogged');
const homeUserMiddleware = require('../middlewares/homeUserLogMiddleware');

/* GET home page. */
router.get('/',homeUserMiddleware , mainController.home);
router.get('/carrito', mainController.carrito);
router.get('/homeUser', userIsLogged, mainController.homeUser);
router.get('/buscar',mainController.buscar);

module.exports = router;
