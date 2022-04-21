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
        let usuarioNuevo = {
            id: users[users.length -1].id+1,
            ...req.body,
            image: req.file.filename
        }
        users.push(usuarioNuevo);
        fs.writeFileSync(usersPath, JSON.stringify(users,null,' '));
        res.redirect('/usuario/perfil/' + usuarioNuevo.id)
        } else {
            res.render('register', { errors: errors.array(), old: req.body });
        }
    },

    cuenta: (req,res,next) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            for (let i =0; i < users.length; i++ ) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.contraseña, users[i].contraseña)) {
                        let usuarioALoguearse = users[i];
                        break;
                    }
                }
            }
            if (usuarioALoguearse == undefined) {
                res.render ('login', {errors: [
                    { msg: 'credenciales invalidas'}
                ]})
            }
            req.session.usuarioLogueado = usuarioALoguearse
            res.redirect('/usuario/perfil/' + usuarioALoguearse.id);
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