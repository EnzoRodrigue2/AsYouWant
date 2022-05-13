function userIsLogged (req, res, next) {
    if (req.session.usuarioLogueado){
        let usuarioLogueado = req.session.usuarioLogueado;
    }
    next();
}

module.exports = userIsLogged