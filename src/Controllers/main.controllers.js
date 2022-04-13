const path = require('path');
const fs = require('fs');

const cursosPath = path.join(__dirname, '../data/cursosDataBase.json');
const cursos = JSON.parse(fs.readFileSync(cursosPath, 'utf-8'));


const controller = {
    home :  function(req, res, next) {
      res.render('index', { cursos: cursos });
    },
    carrito : function(req, res, next) {
      res.render('carrito');
    }
};

module.exports = controller