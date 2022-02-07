const express = require('express');
const app = express();

const path = require('path');

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/index.html')));

app.listen(3000, ()=> console.log('servidor corriendo en el puerto 3000'));

