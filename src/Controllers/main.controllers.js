const path = require('path');
const fs = require('fs');
const { Console } = require('console');

const db = require('../database/models');
const sequelize = db.sequelize;

const cursosPath = path.join(__dirname, '../data/cursosDataBase.json');
const cursos = JSON.parse(fs.readFileSync(cursosPath, 'utf-8'));


var cursosFotos = cursos.filter(el=> el.categoria === "multimedia");
var cursosArt = cursos.filter(el => el.categoria === "manualidades");
// var cursosOrg = cursos.filter(el => el.categoria === "organizacion");
var cursosLead = cursos.filter(el => el.categoria === "liderazgo");
var cursosFood = cursos.filter(el => el.categoria === "alimentos");



const controller = {
    home :  function(req, res, next) {
      db.Curso.findAll()
      .then((cursos)=> {
        // console.log(cursos);
        res.render('index', {cursos});
      });
      // res.render('index', { cursos: cursos });
    },
    carrito : function(req, res, next) {
      res.render('carrito');
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
};

module.exports = controller