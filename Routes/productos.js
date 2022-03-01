const express = require('express');
const routes = express.Router();

const productController = require('../Controllers/productControllers');

routes.get('/productos',productController.index);



module.exports = routes; 
