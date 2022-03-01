const express = require('express');
const routes = express.Router();

const mainControllers = require('../Controllers/mainControllers');

routes.get('/',mainControllers.home);