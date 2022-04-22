function userMiddleware (req, res, next) {
    if (req.session.usuarioALoguearse){
        return res.redirect('/usuario/perfil/' + usuarioALoguearse.id)
    }
    next();
}

module.exports = userMiddleware