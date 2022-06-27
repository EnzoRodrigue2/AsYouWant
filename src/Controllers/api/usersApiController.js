
const db = require('../../database/models');
const sequelize = db.sequelize;
const Op = sequelize.Op;

const usersController = {

    list: (req,res) => {
        db.Usuario.findAll({attributes: ['id', 'nombre', 'apellido', 'email', 'detail', 'imagen']})
        .then(usuarios => {
            let response = {
                count: usuarios.length,
                users: usuarios,
                status: 200
            };
            res.json(response)
        }); 
     },

     detail: (req, res) => {
        db.Usuario.findByPk(req.params.id)
        .then(user => {
            let response = {
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                descripcion: user.descripcion,
                imagen: '/Images/users/' + user.imagen,
                status: 200
            };
            res.json(response)
        });
     },
     
     category: (req, res) => {
        db.Categoria.findAll({attributes: ['id', 'nombre']})
        .then(categories => {
            let response = {
                count: categories.length,
                categorias: categories,
                status: 200
            };
            res.json(response)
        });
     },

     detCategory: (req, res) => {
        let categoriaId = req.params.id;
        db.Usuario.findAll({
            where: {
                categoria_ID: categoriaId
            }
        })
        .then(users => {
            let response = {
                count: users.length,
                status: 200
            };
            res.json(response)
        });
     }
};

module.exports = usersController