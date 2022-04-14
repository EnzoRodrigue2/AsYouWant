const controller = {
    login:(req,res,next) => {
        res.render('login')
    },

    register:(req,res,next) => {
        res.render('register')
    },

    cuenta: {

    },

    perfil:(req, res, next) => {
        res.render('perfil')
    }
}

module.exports = controller;