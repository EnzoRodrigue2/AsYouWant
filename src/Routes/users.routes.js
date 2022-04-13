var express = require('express');
var router = express.Router();
const usersController = require('../Controllers/users.controler')
/* GET Formulario Login. */
router.get('/login', usersController.login)
router.get('/register', usersController.register)
router.get('/perfil', usersController.perfil)
module.exports = router;
