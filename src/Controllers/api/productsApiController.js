
const db = require('../../database/models');
const sequelize = db.sequelize;
const Op = sequelize.Op;

const productsController = {
    list: (req,res) => {
        db.Curso.findAll()
        .then(cursos => {
            let response = {
                count: cursos.length,
                cursos: cursos
            };
            res.json(response)
        }); 
     },

     detail: (req, res) => {
        db.Curso.findByPk(req.params.id)
        .then(curso => {
            let response = {
                titulo: curso.titulo,
                descripcion: curso.descripcion,
                descripcion_corta: curso.descripcion_corta,
                precio: curso.precio,
                unidades: curso.unidades,
                audio: curso.audio,
                vide: curso.video,
                lectura: curso.lectura,
                clases: curso.clases,
                duracion: curso.duracion,
                categoriaCursos: curso.categoriaCursos_ID,
                proferor: curso.profesor_ID,
                unidades_ID: curso.unidades_ID,
                imagen: curso.imagen
            };
            res.json(response)
        });
     }

};

module.exports = productsController;

