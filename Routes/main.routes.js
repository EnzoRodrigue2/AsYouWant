var express = require('express');
var router = express.Router();
const mainController = require('../Controllers/main.controllers')

/* GET home page. */
router.get('/', mainController.home);

/*GET crear producto*/
router.get('/crear', mainController.crear);

/*GET editar producto*/
router.get('/editar', mainController.editar);

module.exports = router;
