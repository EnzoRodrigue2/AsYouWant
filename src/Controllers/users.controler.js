const path = require('path');
const fs = require('fs');
const { validationResult, body } = require('express-validator');

const usersPath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const bcrypt = require('bcrypt');

const db = require('../database/models');
const sequelize = db.sequelize;

// const valPass = bcrypt.compareSync(req.body.contraseña, Usuario.password)

// const encontrarUser = (id) => {
//     let usuario = users.filter(gente => gente.id == id);
//     return usuario
// };

const controller = {
    login:(req,res,next) => {
                res.render('login')
    },

    cuenta: (req,res,next) => {
        let errors = validationResult(req);
        // let usuarioALoguearse = undefined
        if (errors.isEmpty()) {
            db.Usuario.findOne({
                where: {
                    nombre: req.body.nombre,
                    email: req.body.email,
                    password: req.body.contraseña
                }
            }).then((usuarioALoguearse) =>{
                // if(bcrypt.compareSync(req.body.contraseña, usuarioALoguearse.password) == true){
                req.session.usuarioLogueado = usuarioALoguearse;
                let data = req.session.usuarioLogueado;
                console.log(data);
                res.redirect('/usuario/perfil/' + usuarioALoguearse.id);
                // } else{
                //     res.render('login', { errors:[
                //         {msg:'Credenciales invalidas'}
                //     ]});
                // }
            })
            .catch(err => {
                console.log(err);
                res.render('login', { errors:[
                    {msg:'Credenciales invalidas'}
                ]});
            })
            // console.log(req.body);
            // for (i=0; i < users.length; i++){
            //     if (users[i].email === req.body.email){
            //         if (users[i].password === req.body.password) {
            //         usuarioALoguearse = users[i];
            //         break;
            //         }
            //     };
            // }
            // req.session.usuarioLogueado = usuarioALoguearse;
            // let data = req.session.usuarioLogueado;
            // console.log(data);

            // if (usuarioALoguearse == undefined){
            //     return res.render('login', { errors:[
            //         {msg:'Credenciales invalidas'}
            //     ]});
            // } 
            // res.redirect('/usuario/perfil/'+usuarioALoguearse.id, { findUser:usuarioALoguearse});
            // req.session.usuarioLogueado = findUser;

        }else {
            res.render('login', { errors: errors.array(), old: req.body });
        }
        // req.session.usuarioLogueado = findUser;
        let data = req.session.usuarioLogueado;
        console.log(data);
    },

    register:(req,res,next) => {
        db.Categoria.findAll()
            .then(categorias=>{
                res.render('register', {categorias})
            })
    },
    store: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            if(req.file){
                db.Usuario.create({
                nombre: req.body.nombre,
                apellidos: req.body.apellido,
                email: req.body.email,
                descripcion: req.body.descripcion,
                categoria_ID: req.body.categoria,
                password: req.body.contraseña,
                imagen: req.file.filename
                })
                .then(usuario => {
                    res.redirect('/usuario/perfil/' + usuario.id);
                })
                .catch(err => {
                    res.send(err)
                });
                
            } else {
                db.Usuario.create({
                nombre: req.body.nombre,
                apellidos: req.body.apellido,
                email: req.body.email,
                descripcion: req.body.descripcion,
                categoria_ID: req.body.categoria,
                password: req.body.contraseña,
                imagen: 'userDefault.jpg'
                })
                .then(usuario => {
                    res.redirect('/usuario/perfil/' + usuario.id);
                })
                .catch(err => {
                    res.send(err)
                });
                
            }
            // });
            // if(req.file) {
            //     let usuarioNuevo = {
            //         id: users[users.length -1].id+1,
            //         ...req.body,
            //         image: req.file.filename
            //     }
            //     users.push(usuarioNuevo);
            //     fs.writeFileSync(usersPath, JSON.stringify(users,null,' '));
            //     res.redirect('/usuario/perfil/' + usuarioNuevo.id)
            // } else {
            //     let usuarioNuevo = {
            //         id: users[users.length -1].id+1,
            //         ...req.body,
            //         image: 'userDefault.jpg'
            //     }
            //     users.push(usuarioNuevo);
            //     fs.writeFileSync(usersPath, JSON.stringify(users,null,' '));
            //     res.redirect('/usuario/perfil/' + usuarioNuevo.id)
            // }
        } else {
        db.Categoria.findAll()
        .then(categorias=>{
            res.render('register', {categorias, errors: errors.array(), old: req.body });
        })
        }
    },

    perfil:(req, res, next) => {
        // let idUsuario = req.params.id;
        // let findUser = encontrarUser(idUsuario);
        // findUser = findUser[0];
        // let data = req.session.usuarioLogueado;
        // res.render('perfil', {findUser, data})

        db.Usuario.findByPk(req.params.id)
            .then((findUser)=> {
                res.render('perfil', {findUser})
            })
    },

     editView: (req, res, next) => {
        let pedidoUser = db.Usuario.findByPk(req.params.id)
        let pedidoCategoria = db.Categoria.findAll()
        Promise.all([pedidoUser, pedidoCategoria])
            .then(([findUser, categorias])=> {
                res.render('editUser', {findUser, categorias});
            })
            .catch((err)=>{
                console.log(err);
            })
        // db.Usuario.findByPk(req.params.id)
        // .then((findUser)=> {
        //     res.render('editUser', {findUser})
        // })
        // let idUsuario = req.params.id;
        // let findUser = encontrarUser(idUsuario);
        // findUser = findUser[0];
        // res.render('editUser', {findUser})
     },
     edit: (req, res)=> {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            if(req.file){
                db.Usuario.update({
                    nombre: req.body.nombre,
                    apellidos: req.body.apellido,
                    email: req.body.email,
                    descripcion: req.body.descripcion,
                    categoria_ID: req.body.categoria,
                    password: req.body.contraseña,
                    imagen: req.file.filename
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.redirect('/usuario/perfil/' + req.params.id);
            } else {
                db.Usuario.update({
                nombre: req.body.nombre,
                apellidos: req.body.apellido,
                email: req.body.email,
                descripcion: req.body.descripcion,
                categoria_ID: req.body.categoria,
                password: req.body.contraseña
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.redirect('/usuario/perfil/' + req.params.id);
            }
        } else {
            
        let pedidoUser = db.Usuario.findByPk(req.params.id)
        let pedidoCategoria = db.Categoria.findAll()
        Promise.all([pedidoUser, pedidoCategoria])
            .then(([findUser, categorias])=> {
                res.render('editUser', {findUser, categorias, errors: errors.array(), old: req.body});
            })
        }
     }
     
    //  list: (req,res) => {
    //     db.Usuario.findAll()
    //     .then((resultado) => {
    //     // console.log({usuarios: resultado})
    //     });
    //     // Prueba para lograr vincular los usuarios == success <3
    //  }
     
}

module.exports = controller;