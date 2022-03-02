const express = require('express');
const res = require('express/lib/response');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(publicPath));

const rutasProductos = require('./Routes/productos');
// const rutasProductos = require('./Routes/productos');
// const rutasMain = require('./Controllers/mainControllers');
// const rutasUser = require('./Controllers/userControler');


app.set('views engine', 'ejs');



// app.use('/producto', rutasProductos);


// app.use('/user',rutasUser);
// app.use('/main', rutasMain);


// Rutas a ejs( metodo 'render')

app.get('/', (req, res) => res.render(path.resolve(__dirname, './views/index.ejs')));
app.post('/', (req, res) => res.render(path.resolve(__dirname, './views/index.ejs')));
app.get('/login', (req, res) => res.render(path.resolve(__dirname, './views/login.ejs')));
app.get('/carrito', (req, res) => res.render(path.resolve(__dirname, './views/carrito.ejs')));
app.get('/crear-producto', (req, res) => res.render(path.resolve(__dirname, './views/crear-producto.ejs')));
app.get('/producto', (req, res) => res.render(path.resolve(__dirname, './views/info-producto.ejs')));


app.listen(process.env.PORT || 3000, () => console.log("Servidor corriendo en Puerto: 3000"));











// Rutas a HTML(metodo 'sendFiles')

// app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/index.html')));
// app.post('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/index.html')));
// app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, './views/login.html')));
// app.get('/carrito', (req, res) => res.sendFile(path.resolve(__dirname, './views/carrito.html')));
// app.get('/crear-producto', (req, res) => res.sendFile(path.resolve(__dirname, './views/crear-producto.html')));
// app.get('/producto', (req, res) => res.sendFile(path.resolve(__dirname, './views/info_product.html')));
