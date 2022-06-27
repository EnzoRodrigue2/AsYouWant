const { json } = require('express/lib/response');
const res = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const db = require('../database/models');
const { log } = require('console');

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
    list: (req, res) => {
        let saleNow = temporadaSale[mesActual] || temporadaSale[tipo];
        console.log(products)

        db.categoriaCursos.findAll()
        .then(function(categorias) {
            let categoriasBase = categorias;
            db.Curso.findAll()
            .then((resultado) => {
                res.render('listaProductos', {productos:resultado, saleNow: saleNow, categorias: categoriasBase, categoriaBuscada: ""})
            })
        })
    },

    categoriaCursos: (req,res) => {
        let categoriaBuscada = req.params.categoria;
        let saleNow = temporadaSale[mesActual] || temporadaSale[tipo];


        db.categoriaCursos.findAll()
        .then(function(resultado) {
            console.log(resultado);
            let categoriaFiltro = "";
            for(i=0;i<resultado.length;i++){
                if(resultado[i].nombre == categoriaBuscada ){
                    categoriaFiltro = resultado[i];
                    break;
                }
            }

            let categorias = resultado
            db.Curso.findAll({
                where:{
                    categoriaCursos_ID: categoriaFiltro.id
                }
            })
            .then(function(cursosFiltrados) {
                console.log(cursosFiltrados);
                res.render("listaProductos", {productos:cursosFiltrados,saleNow: saleNow, categorias: resultado, categoriaBuscada: categoriaBuscada})
            })
        })
    },

    detalle: (req, res) => {
        let idProducto = req.params.id;
        db.Curso.findByPk(idProducto)
        .then(function(producto) {
            let curso = producto;
            db.Curso.findAll({
                where:{
                    categoriaCursos_ID: curso.categoriaCursos_ID
                }
            })
            .then(function(cursosPCategoria){

                res.render('info-producto-2',{productDetail:curso,sugerencias:cursosPCategoria})
            })
        }
        )
    },
    
    edit: (req,res) => {
        let idProducto = req.params.id;
        db.categoriaCursos.findAll()
        .then(function(categoriasDB) {
            let categorias = categoriasDB
            db.Curso.findAll({
                where: {
                    id: idProducto
                }
            })
            .then(function(curso){
                let productEditar = curso[0];
                console.log(productEditar)
                return res.render('editar-producto', {productEditar, categorias:categorias, findUser:req.session.usuarioLogueado })
            })
            
        })
    },

    guardarCambios: (req,res) => {
        let idProducto = req.params.id;
        let tieneAudio = (req.body.audio) ? 1 : 0;
        let tieneVideo = (req.body.video) ? 1 : 0;
        let tieneLectura = (req.body.lectura) ? 1 : 0;
        let profesorID = null;
        // if(req.session.usuarioLogueado){
        //     profesorID = req.session.usuarioLogueado
        // } else {
        //     profesorID = null;
        // };
        
        let imagenCurso = ""
        if (req.file !== undefined) {
            imagenCurso = req.file.filename;
        } else {
            imagenCurso = req.body.imagenPrevia
        }
        db.categoriaCursos.findAll({
            where:{
                nombre:req.body.categorias
            }
        })
        .then(function(resultado){
            console.log(resultado);
            db.Curso.update({
                titulo: req.body.titulo,
                descripcion: req.body.descripcion_larga,
                descripcion_corta: req.body.description_corta,
                precio: req.body.precio,
                audio: tieneAudio,
                video: tieneVideo,
                lectura: tieneLectura,
                categoriaCursos_ID: resultado.id,
                profesor_ID: profesorID,
                unidades_ID: null,
                imagen: imagenCurso
            }, {
                where: {
                    id: idProducto
                }
            })
            res.redirect('/productos');
        })
    },

    crear: (req,res) => {
        db.categoriaCursos.findAll()
        .then(function(categorias) {
            return res.render('crear-producto', { categorias:categorias, findUser:req.session.usuarioLogueado })
        })
    },

    agregar: (req,res) => {
        let tieneAudio = (req.body.audio) ? 1 : 0;
        let tieneVideo = (req.body.video) ? 1 : 0;
        let tieneLectura = (req.body.lectura) ? 1 : 0;
        let profesorID = null;
        // if(req.session.usuarioLogueado){
        //     profesorID = req.session.usuarioLogueado
        // } else {
        //     profesorID = null;
        // };
        console.log(req.body);
        db.categoriaCursos.findAll({
            where:{
                nombre:req.body.categorias
            }
        })
        .then(function(resultado){

            db.Curso.create({
                titulo: req.body.titulo,
                descripcion: req.body.descripcion_larga,
                descripcion_corta: req.body.description_corta,
                precio: req.body.precio,
                audio: tieneAudio,
                video: tieneVideo,
                lectura: tieneLectura,
                categoriaCursos_ID: resultado[0].id,
                profesor_ID: profesorID,
                unidades_ID: null,
                imagen: "/images/" + req.file.filename
            })
            res.redirect('/productos');
        })
    },

    delete: (req,res) => {
        let idProducto = req.params.id;
        
        db.Curso.findByPk(idProducto)
        .then(function(curso){
            productDelete = curso
            res.render('borrarProducto', {productDelete} )
        })
    },
    destroyed: (req,res) => {
        let idProducto = req.params.id;
        db.Curso.destroy({
            where: {
                id: idProducto
            }
        })
        .then(function(){
            res.redirect("/")
        })
        
    }
    
};

module.exports = controller;