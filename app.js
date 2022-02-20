const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');



app.use(express.static(publicPath));
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/index.html')));
app.post('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/index.html')));
app.get('/producto', (req, res) => res.sendFile(path.resolve(__dirname, './views/info_product.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, './views/login.html')));
app.get('/carrito', (req, res) => res.sendFile(path.resolve(__dirname, './views/carrito.html')));


app.listen(process.env.PORT || 3000, () => console.log("Servidor corriendo en Puerto: 3000"));
