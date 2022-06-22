var express = require('express');
var router = express.Router();
const carritoController = require('../Controllers/carrritoControllers');
// const userIsLogged = require('../middlewares/userIsLogged');
// const homeUserMiddleware = require('../middlewares/homeUserLogMiddleware');


router.get('/', carritoController.carrito);
router.get('/:id', carritoController.carritoProducto);

module.exports = router;