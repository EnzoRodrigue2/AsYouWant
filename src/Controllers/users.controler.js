const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator')

const usersPath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const bcrypt = require('bcrypt');

const encontrarUser = (id) => {
    let usuario = users.filter(gente => gente.id == id);
    return usuario
};

const controller = {
    login:(req,res,next) => {
        res.render('login')
    },

    register:(req,res,next) => {
        res.render('register')
    },
    store: (req,res,next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            if(req.file) {
                let usuarioNuevo = {
                    id: users[users.length -1].id+1,
                    ...req.body,
                    image: req.file.filename
                }
                users.push(usuarioNuevo);
                fs.writeFileSync(usersPath, JSON.stringify(users,null,' '));
                res.redirect('/usuario/perfil/' + usuarioNuevo.id)
            } else {
                let usuarioNuevo = {
                    id: users[users.length -1].id+1,
                    ...req.body,
                    image: 'userDefault.jpg'
                }
                users.push(usuarioNuevo);
                fs.writeFileSync(usersPath, JSON.stringify(users,null,' '));
                res.redirect('/usuario/perfil/' + usuarioNuevo.id)
            }
        } else {
            res.render('register', { errors: errors.array(), old: req.body });
        }
    },

    cuenta: (req,res,next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            for (let i =0; i < users.length; i++ ) {
                if (users[i].email == req.body.email) {
                    if (users[i].contraseña == req.body.contraseña) {
                        var usuarioALoguearse = users[i];
                        break;
                    }
                    req.session.usuarioLogueado = usuarioALoguearse[0]
                    console.log(usuarioALoguearse);
                    res.redirect('/usuario/perfil/' + usuarioALoguearse[0].id, { findUser: usuarioALoguearse[0]} );
                }
            }
            if (usuarioALoguearse == undefined) {
                res.render ('login', {errors: [
                    { msg: 'credenciales invalidas'}
                ]})
            }
            req.session.usuarioLogueado = usuarioALoguearse
            res.redirect('/usuario/perfil/' + usuarioALoguearse.id, { findUser: usuarioALoguearse} );
        }
        else {
            return res.render('login', { errors: errors.array(), old: req.body })
        }

    },

    perfil:(req, res, next) => {
        let idUsuario = req.params.id;
        let findUser = encontrarUser(idUsuario)
        findUser = findUser[0]
        res.render('perfil', {findUser})
    }
}

module.exports = controller;