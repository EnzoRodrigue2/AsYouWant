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
        let usuarioALoguearse = undefined
        if (errors.isEmpty()) {
            console.log(req.body);
            for (i=0; i < users.length; i++){
                if (users[i].email === req.body.email){
                    if (users[i].password === req.body.password) {
                    usuarioALoguearse = users[i];
                    break;
                    }
                };
            }
            req.session.usuarioLogueado = usuarioALoguearse;
            let data = req.session.usuarioLogueado;
            console.log(data);

            if (usuarioALoguearse == undefined){
                return res.render('login', { errors:[
                    {msg:'Credenciales invalidas'}
                ]});
            } 
            res.redirect('/usuario/perfil/'+usuarioALoguearse.id, { findUser:usuarioALoguearse});
            
            
        }
        req.session.usuarioLogueado = usuarioALoguearse;
        let data = req.session.usuarioLogueado;
        console.log(data);
    },

    perfil:(req, res, next) => {
        let idUsuario = req.params.id;
        let findUser = encontrarUser(idUsuario);
        findUser = findUser[0];
        let data = req.session.usuarioLogueado;
        res.render('perfil', {findUser, data})
    },

     edit: (req, res, next) => {
        let idUsuario = req.params.id;
        let findUser = encontrarUser(idUsuario);
        findUser = findUser[0];
        res.render('editUser', {findUser})
     }
     
    //  list: (req,res) => {
    //     db.Usuario.findAll()
    //     // .then((resultado) => {
    //     // // console.log({usuarios: resultado})
    //     // });
    //     // Prueba para lograr vincular los usuarios == success <3
    //  }
     
}

module.exports = controller;