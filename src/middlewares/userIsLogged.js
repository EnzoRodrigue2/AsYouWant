function userIsLogged (req, res, next) {
    if (req.session.usuarioLogueado){
        let usuarioLogueado = req.session.usuarioLogueado;
        return res.redirect('/homeUser')
    }
    next();
}

module.exports = userIsLogged