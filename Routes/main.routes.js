var express = require('express');
var router = express.Router();
const mainController = require('../Controllers/main.controllers')

/* GET home page. */
router.get('/', mainController.home);

module.exports = router;
