const path = require('path');
const fs = require('fs');
const { Console } = require('console');

// const db = require('../database/models');
// const sequelize = db.sequelize;

const cursosPath = path.join(__dirname, '../data/cursosDataBase.json');
const cursos = JSON.parse(fs.readFileSync(cursosPath, 'utf-8'));


var cursosFotos = cursos.filter(el=> el.categoria === "multimedia");
var cursosArt = cursos.filter(el => el.categoria === "manualidades");
//var cursosOrg = cursos.filter(el => el.categoria === "organizacion");
var cursosLead = cursos.filter(el => el.categoria === "liderazgo");
var cursosFood = cursos.filter(el => el.categoria === "alimentos");



const controller = {
    home :  function(req, res, next) {
      // db.Curso.findAll()
      // .then((courses)=> {
      //   console.log(courses);
      //   res.render('index', {courses});
      // });
      res.render('index', { cursos: cursos });
    },
    carrito : function(req, res, next) {
      res.render('carrito');
    },
    homeUser :  function(req, res, next) {
      res.render('indexUser', { cursosFotos, cursosArt, cursosLead, cursosFood });
    },
};

module.exports = controller