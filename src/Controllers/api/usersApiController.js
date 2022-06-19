
const db = require('../../database/models');
const sequelize = db.sequelize;
const Op = sequelize.Op;

const usersController = {

    list: (req,res) => {
        db.Usuario.findAll({attributes: ['id', 'nombre', 'apellidos', 'email', 'detail']})
        .then(usuarios => {
            let response = {
                count: usuarios.length,
                users: usuarios
            };
            res.json(response)
        }); 
     },

     detail: (req, res) => {
        db.Usuario.findByPk(req.params.id)
        .then(user => {
            let response = {
                nombre: user.nombre,
                apellidos: user.apellidos,
                email: user.email,
                descripcion: user.descripcion,
                imagen: '/Images/users/' + user.imagen
            };
            res.json(response)
        });
     }
};

module.exports = usersController