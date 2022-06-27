
const db = require('../../database/models');
const sequelize = db.sequelize;
const Op = sequelize.Op;

const productsController = {
    list: (req,res) => {
        db.Curso.findAll()
        .then(cursos => {
            if (cursos.length > 0){
                let response = {
                    count: cursos.length,
                    cursos: cursos,
                    status: 200
                };
                res.json(response)
            } else {
                res.json("No se encontraron cursos")
            }
        }); 
     },
     categorias: (req, res) => {
         db.categoriaCursos.findAll()
         .then(function(categoriasBase) {
             if (categoriasBase.length>0){
                let response = {
                    count: categoriasBase.length,
                    Categorias: categoriasBase,
                    status: 200
                };
                res.json(response)
                
             } else {
                res.json("No encontramos categorias")
             }
            
        })
     },

    //  categoria: (req, res) => {
    //     let categorias,
    //     db.categoriaCursos.findAll()
    //     .then(function(resultado){
    //        let categoriaFiltro = "";
    //        for(i=0;i<resultado.length;i++){
    //            if(resultado[i].nombre == categoriaBuscada ){
    //                categoriaFiltro = resultado[i];
    //                break;
    //            }
    //        }
    //        if (categoriaFiltro != "") {
    //            db.Curso.findAll({
    //                where:{
    //                    categoriaCursos_ID: categoriaFiltro.id
    //                }
    //            })
    //            .then(function(cursosFiltrados) {
    //                let response = {
    //                    count: cursosFiltrados.length,
    //                    cursos: cursosFiltrados,
    //                    status: 200
    //                };
    //                res.json(response)
                   
    //            })
    //        } else {
    //            res.json("Todavia no tenemos cursos sobre eso")
    //        }

    //     })
    // },

     detail: (req, res) => {
        db.Curso.findByPk(req.params.id)
        .then(curso => {
            if (curso != "" ) {
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
                    imagen: curso.imagen,
                    status: 200
                };
                res.json(response)
            } else {
                res.json("No se encontro el curso buscado")
            }
        });
     }

};

module.exports = productsController;

