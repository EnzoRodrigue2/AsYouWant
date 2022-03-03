const express = require('express');
const routes = express.Router();

const productosController = require('../Controllers/productControllers');

routes.get('/', productosController.producto);





module.exports = routes; 
