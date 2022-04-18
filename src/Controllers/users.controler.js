const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator')

const usersPath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

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
        // let errors = validationResult(req);
        // if (errors.isEmpty()) {
        // let usuarioNuevo = {
        //     id: users[users.length -1].id+1,
        //     ...req.body
        // }
        // users.push(usuarioNuevo);
        // fs.writeFileSync(usersPath, JSON.stringify(users,null,' '));
        // res.redirect('/')
        // } else {
        //     res.render('register', { errors: errors.array(), old: req.body });
        //     // res.send(errors);
        // }
        

        let usuarioNuevo = {
            id: users[users.length -1].id+1,
            ...req.body
        }
        users.push(usuarioNuevo);
        fs.writeFileSync(usersPath, JSON.stringify(users,null,' '));
        res.redirect('/usuario/perfil/' + usuarioNuevo.id);
    },

    cuenta: {

    },

    perfil:(req, res, next) => {
        let idUsuario = req.params.id;
        let findUser = encontrarUser(idUsuario)
        findUser = findUser[0]
        res.render('perfil', {findUser})
    }
}

module.exports = controller;