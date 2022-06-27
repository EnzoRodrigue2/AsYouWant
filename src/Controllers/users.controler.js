const path = require('path');
const fs = require('fs');
const { validationResult, body } = require('express-validator');

const usersPath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const bcrypt = require('bcrypt');

const db = require('../database/models');
const sequelize = db.sequelize;

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
                req.session.usuarioLogueado = usuarioALoguearse;
                let data = req.session.usuarioLogueado;
                res.redirect('/usuario/perfil/' + usuarioALoguearse.id);
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
            db.Categoria.findAll({
                where: {
                    nombre: req.body.categoria
                }
            })
            .then( function(result) {
                if(req.file){
                db.Usuario.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    descripcion: req.body.descripcion,
                    categoria_ID: result[0].id,
                    password: req.body.contraseña,
                    imagen: req.file.filename
                })
                .then(usuario => {
                    req.session.usuarioLogueado = usuario;
                    let data = req.session.usuarioLogueado;

                    res.redirect('/usuario/perfil/' + usuario.id);
                    db.Usuario.update({
                        detail: '/api/users/' + usuario.id
                    }, {
                        where: {
                            id: usuario.id
                        }
                    });
                })
                // .then(user=>{
                //     res.redirect('/usuario/perfil/' + user.id)
                // })
                .catch(err => {
                    res.send(err)
                });
                } else {
                db.Usuario.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    descripcion: req.body.descripcion,
                    categoria_ID: result[0].id,
                    password: req.body.contraseña,
                    imagen: 'userDefault.jpg'
                })
                .then(usuario => {
                    res.redirect('/usuario/perfil/' + usuario.id);
                    db.Usuario.update({
                        detail: '/api/users/' + usuario.id
                    }, {
                        where: {
                            id: usuario.id
                        }
                    });
                })
                // .then(user=>{
                //     res.redirect('/usuario/perfil/' + user.id)
                // })
                .catch(err => {
                    res.send(err)
                });
                
            }
            })
            
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
        db.Usuario.findByPk(req.params.id)
            .then((findUser)=> {
                res.render('perfil', {findUser})
            })
        // let idUsuario = req.params.id;
        // let findUser = encontrarUser(idUsuario);
        // findUser = findUser[0];
        // let data = req.session.usuarioLogueado;
        // res.render('perfil', {findUser, data})
    },

     editView: (req, res, next) => {           
        let idUsuario = req.params.id; 
        db.Usuario.findByPk(idUsuario)
            .then((findUser)=> {
                res.render('editUser', {findUser})
            })
            .catch((err)=>{
                console.log(err);
            })
        
        // let idUsuario = req.params.id;
        // let findUser = encontrarUser(idUsuario);
        // findUser = findUser[0];
        // res.render('editUser', {findUser})
     },
     
     edit: (req, res)=> {
        let idUsuario = req.params.id;
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Categoria.findAll({
                where: {
                    nombre: req.body.categoria
                }
            })
            .then(function(result){
                if (req.file) {
                console.log(result);
                db.Usuario.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                descripcion: req.body.descripcion,
                categoria_ID: result.id,
                imagen: req.file.filename,
                password: req.body.contraseña
                }, {
                    where: {
                        id: idUsuario
                    }
                })
                .then(()=> {
                    res.redirect('/usuario/perfil/' + idUsuario);
                })
            } else{
                console.log(result);
                db.Usuario.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                descripcion: req.body.descripcion,
                categoria_ID: result.id,
                password: req.body.contraseña
                }, {
                    where: {
                        id: idUsuario
                    }
                })
                .then(()=> {
                    res.redirect('/usuario/perfil/' + idUsuario);
                })
            }
            })
        } else {
            db.Usuario.findByPk(idUsuario)
            .then((findUser)=> {
                res.render('editUser', {findUser, errors: errors.array(), old: req.body })
            })
            .catch((err)=>{
                console.log(err);
            })
        }
     }  
}

module.exports = controller;