const path = require('path');
const fs = require('fs');
const { Console } = require('console');

const db = require('../database/models');
const sequelize = db.sequelize;
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

const cursosPath = path.join(__dirname, '../data/cursosDataBase.json');
const cursos = JSON.parse(fs.readFileSync(cursosPath, 'utf-8'));


var cursosFotos = cursos.filter(el=> el.categoria === "multimedia");
var cursosArt = cursos.filter(el => el.categoria === "manualidades");
// var cursosOrg = cursos.filter(el => el.categoria === "organizacion");
var cursosLead = cursos.filter(el => el.categoria === "liderazgo");
var cursosFood = cursos.filter(el => el.categoria === "alimentos");


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

const controllers = {

carrito : function(req, res, next) {
    res.render('carrito');
  },

  carritoProducto: function(req,res,next){
    let productoComprar
    let id = req.params.id
    db.Curso.findByPk(id) 
    .then((curso) => {
      productoComprar = curso
      res.render('carritoComprar', productoComprar)
    })
  },
}
module.exports = controllers