const { json } = require('express/lib/response');
const res = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

///////////////////////////////////////////////////////////////////////
// Esta linea es la que falla, se rompe al querer encontrar esa direccion
const db = require('../database/models/index.js');
/////////////////////////////////////////////////////////////////////
///////////////////////


// const Cursos = require('../database/models/Curso.js');


const productsFilePath = path.join(__dirname, '../data/cursosDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const saleFilePath = path.join(__dirname, '../data/saleDataBase.json');
const sale = JSON.parse(fs.readFileSync(saleFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const searchForId = (id) => { 
    let productos = products.filter(products => products.id == id);
    return productos
};

const searchForSimilar = (thisCategoria) => {
    let productosSugeridos = []
    for(var i=0; i < products.length; i++) {
        if (products[i].categoria == thisCategoria) {
            productosSugeridos.push(products[i])
        };
    }
    return productosSugeridos;
};

//Variables de fechas para ofertas
let meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
let fecha = new Date;
let hoy = fecha.getMonth();
var mesActual =meses[hoy];

var temporadaSale = {
    tipo: 'saleOffer.png',
    noviembre: 'navidad.jpg',
    diciembre: 'navidad.jpg',
    marzo: 'black_friday.jpg',
    abril: 'black_friday.jpg',
    mayo: 'black_friday.jpg',
    junio: 'otonio.jpg',
    julio: 'otonio.jpg',
    agosto: 'otonio.jpg',
};


const controller = {
    // index: {

    // },
    list: (req, res) => {
        // console.log(hoy, mesActual);
        // let saleNow = temporadaSale[mesActual] || temporadaSale[tipo];
        // // let saleNow = temporadaSale['diciembre'];
        // // let saleNow = temporadaSale['junio'];
        // res.render('listaProductos',{ productos: products , saleNow: saleNow} );

        let saleNow = temporadaSale[mesActual] || temporadaSale[tipo];
        db.Curso.findAll()
        .then((resultado) => {
            res.render('listaProductos', {productos:resultado, saleNow: saleNow})
        })
    },


    detalle: (req, res) => {
        let idProducto = req.params.id;
        let productDetail = searchForId(idProducto)
        productDetail = productDetail[0]

        let thisCategoria = productDetail.categoria;
        let sugerencias= searchForSimilar(thisCategoria);
        console.log(sugerencias);
        res.render('info-producto-2',{productDetail,sugerencias} );
        
    },
    
    edit: (req,res) => {
        let idProducto = req.params.id;
        let productEditar = searchForId(idProducto)
        productEditar = productEditar[0]
        res.render('editar-producto', {productEditar})

    },
    crear: (req,res) => {
        res.render('crear-producto')
    },

    agregar: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            if(req.file) {
                let productoNuevo = {
                    id: products[products.length -1].id+1,
                    ...req.body
                }
                products.push(productoNuevo);
                fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));
                res.redirect('/')
            } else {
                let productoNuevo = {
                    id: products[products.length -1].id+1,
                    ...req.body,
                    image: 'courseDefault.jpg'
                }
                products.push(productoNuevo);
                fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));
                res.redirect('/productos/info/' + productoNuevo.id)
            }
        } else {
            res.render('crear-producto', { errors: errors.array(), old: req.body });
        }
    },

    delete: (req,res) => {
        let idProducto = req.params.id;
        let productDelete = searchForId(idProducto)
        productDelete = productDelete[0]
        res.render('borrarProducto', {productDelete} )
    }
};

module.exports = controller;