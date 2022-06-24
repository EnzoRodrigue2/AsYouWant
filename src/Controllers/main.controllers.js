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


const controller = {
    home :  function(req, res, next) {
      db.Curso.findAll()
      .then((cursos)=> {
        res.render('index', {cursos});
      });
    },

    homeUser :  function(req, res, next) {
      let findCursosFotos = db.Curso.findAll({where: {categoriaCursos_ID: 2}});
      let findCursosArt = db.Curso.findAll({where: {categoriaCursos_ID: 3}});
      let findCursosOrg = db.Curso.findAll({where: {categoriaCursos_ID: 1}});
      let findCursosLead = db.Curso.findAll({where: {categoriaCursos_ID: 5}});
      let findCursosFood = db.Curso.findAll({where: {categoriaCursos_ID: 4}});
      Promise.all([ findCursosFotos, findCursosArt, findCursosOrg, findCursosLead, findCursosFood ])
        .then(([ cursosFotos, cursosArt, cursosOrg, cursosLead, cursosFood ])=> {
          res.render('indexUser', { cursosFotos, cursosArt, cursosOrg, cursosLead, cursosFood });
        })
        .catch((error)=>{
          console.log(error);
        })
      
    },
    buscar: (req,res) => {
      let buscado = req.query.palabraBuscada
      let saleNow = temporadaSale[mesActual] || temporadaSale[tipo];
      db.categoriaCursos.findAll()
        .then(function(categorias) {
          db.Curso.findAll({
            where: {
              titulo: {
                [Op.like]: '%'+buscado+'%'
              },
            }
          })
          .then(function(resultado){
            res.render("listaProductos", {productos:resultado,saleNow: saleNow, categorias: categorias, categoriaBuscada: ""})
          })
        })
    },
    carrito : function(req, res, next) {
      let cursosParaCompra;
      db.Curso.findAll()
      .then ((cursos) => {
        cursosParaCompra = cursos;
        res.render('carrito', {compras: cursosParaCompra});
      }
      )
    }
};

module.exports = controller