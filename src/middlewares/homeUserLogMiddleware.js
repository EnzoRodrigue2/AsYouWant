function homeUserMiddleware (req, res, next) {
    if (req.session.usuarioLogueado){
        let usuarioLogueado = req.session.usuarioLogueado;
        return res.redirect('/homeUser', {usuarioLogueado})
    }
    next();
}

module.exports = homeUserMiddleware