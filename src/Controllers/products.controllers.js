const { json } = require('express/lib/response');
const res = require('express/lib/response');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

///////////////////////////////////////////////////////////////////////
// Esta linea es la que falla, se rompe al querer encontrar esa direccion
const db = require('../database/models');
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
    //     // console.log(hoy, mesActual);
    //     // let saleNow = temporadaSale[mesActual] || temporadaSale[tipo];
    //     // // let saleNow = temporadaSale['diciembre'];
    //     // // let saleNow = temporadaSale['junio'];
    //     // res.render('listaProductos',{ productos: products , saleNow: saleNow} );

        let saleNow = temporadaSale[mesActual] || temporadaSale[tipo];

        db.categoriaCursos.findAll()
        .then(function(categorias) {
            let categoriasBase = categorias;
            db.Curso.findAll()
            .then((resultado) => {
                res.render('listaProductos', {productos:resultado, saleNow: saleNow, categorias: categoriasBase})
            })
        })

        // db.Curso.findAll()
        // .then((resultado) => {
        //     res.render('listaProductos', {productos:resultado, saleNow: saleNow, categorias: categorias})
        // })
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
                res.render("listaProductos", {productos:cursosFiltrados,saleNow: saleNow, categorias: resultado})
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

        // CONTROLADOR CON JSON

        // let productDetail = searchForId(idProducto)
        // productDetail = productDetail[0]

        // let thisCategoria = productDetail.categoria;
        // let sugerencias= searchForSimilar(thisCategoria);
        // console.log(sugerencias);
        // res.render('info-producto-2',{productDetail,sugerencias} );
        
    },
    
    edit: (req,res) => {
        let idProducto = req.params.id;
        db.Curso.findAll({
            where: {
                id: idProducto
            }
        })
        .then(function(curso){
            let productEditar = curso[0];
            console.log(productEditar)
            res.render('editar-producto', {productEditar})
        })

    },

    guardarCambios: (req,res) => {
        let idProducto = req.params.id;
        let tieneAudio = (req.body.audio) ? 1 : 0;
        let tieneVideo = (req.body.video) ? 1 : 0;
        let tieneLectura = (req.body.lectura) ? 1 : 0;
        let profesorID = "";
        if(req.session.usuarioLogueado){
            profesorID = req.session.usuarioLogueado
        } else {
            profesorID = null;
        };
        console.log(req.body);
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
            return res.render('crear-producto', { categorias:categorias })
        })
    },

    agregar: (req,res) => {
        let tieneAudio = (req.body.audio) ? 1 : 0;
        let tieneVideo = (req.body.video) ? 1 : 0;
        let tieneLectura = (req.body.lectura) ? 1 : 0;
        let profesorID = "";
        if(req.session.usuarioLogueado){
            profesorID = req.session.usuarioLogueado
        } else {
            profesorID = null;
        };
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
                imagen: "/images/imagenes/" + req.file.filename
            })
            res.redirect('/productos');
        })
        // db.Curso.create({
        //     titulo: req.body.titulo,
        //     descripcion: req.body.descripcion_larga,
        //     descripcion_corta: req.body.description_corta,
        //     precio: req.body.precio,
        //     audio: tieneAudio,
        //     video: tieneVideo,
        //     lectura: tieneLectura,
        //     categoriaCursos_ID: req.body.categoria.id,
        //     profesor_ID: profesorID,
        //     unidades_ID: null,
        //     imagen: "/images/imagenes/" + req.file.filename
        // })
        // res.redirect('/productos');
        // let errors = validationResult(req);
        //     if (errors.isEmpty()) {
        //         if(req.file) {
        //             let tieneAudio = (req.body.audio == true) ? 1 : 0;
        //             let tieneVideo = (req.body.video == true) ? 1 : 0;
        //             let tieneLectura = (req.body.lectura == true) ? 1 : 0;
        //             let profesorID = "";
        //             if(req.session.usuarioLogueado){
        //                 profesorID = req.session.usuarioLogueado
        //             } else {
        //                 profesorID = null;
        //             };

        //             let categoriaID = "";
        //             db.Curso.create({
        //                 titulo: req.body.titulo,
        //                 descripcion: req.body.descripcion_larga,
        //                 descripcion_corta: req.body.descripcion_corta,
        //                 precio: req.body.precio,
        //                 audio: tieneAudio,
        //                 video: tieneVideo,
        //                 lectura: tieneLectura,
        //                 categoriaCursos_ID: req.body.categoria,
        //                 profesor_ID: profesorID,
        //                 imagen: req.file.filename
        //             })
        //             res.redirect('/productos');

        //         }
        //     } else {
        //         res.redirect('/productos/info/' + productoNuevo.id)
        //     }

            // if(req.file) {
            //     let tieneAudio = (req.body.audio == true) ? 1 : 0;
            //     let tieneVideo = (req.body.video == true) ? 1 : 0;
            //     let tieneLectura = (req.body.lectura == true) ? 1 : 0;
            //     let profesorID = "";
            //     if(req.session.usuarioLogueado){
            //         profesorID = req.session.usuarioLogueado
            //     } else {
            //         profesorID = null;
            //     };
            //     db.Curso.create({
            //         titulo: req.body.titulo,
            //         descripcion: req.body.descripcion_larga,
            //         descripcion_corta: req.body.descripcion_corta,
            //         precio: req.body.precio,
            //         audio: tieneAudio,
            //         video: tieneVideo,
            //         lectura: tieneLectura,
            //         categoriaCursos_ID: req.body.categoria,
            //         profesor_ID: profesorID,
            //         unidades_ID: null,
            //         imagen: req.file.filename
            //     })
            //     res.redirect('/productos');

            // } 
        // db.categoriaCursos.findAll()
        // .then( (categorias) => {
        //     for(i=0; i<categorias.length; i ++) {
        //         if(categorias[i].titulo == req.body.categorias){
        //             categoriaID = categorias[i].id;
        //         }
        //     };
        //     let errors = validationResult(req);
        //     if (errors.isEmpty()) {
        //         if(req.file) {
        //             db.Curso.create({
        //                 titulo: req.body.titulo,
        //                 descripcion: req.body.descripcion_larga,
        //                 descripcion_corta: req.body.descripcion_corta,
        //                 precio: req.body.precio,
        //                 audio: tieneAudio,
        //                 video: tieneVideo,
        //                 lectura: tieneLectura,
        //                 categoriaCursos_ID: req.body.categoria,
        //                 profesor_ID: profesorID,
        //                 imagen: req.file.filename
        //             })
        //             res.redirect("/productos");

        //         }
        //     } else {
        //         res.redirect('/productos/info/' + productoNuevo.id)
        //     }
        // }
        //     );

       
        //         res.redirect('/productos/info/' + productoNuevo.id)

        //     }
        // } else {
        //     res.render('crear-producto', { errors: errors.array(), old: req.body });
        // }
        //     });
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