const express = require('express');
const routes = express.Router();

const productosController = require('../Controllers/productControllers');

routes.get('/producto', productosController.producto);





module.exports = routes; 
