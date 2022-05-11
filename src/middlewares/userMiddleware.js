function userMiddleware (req, res, next) {
    if (req.session.usuarioLogueado){
        let usuarioLogueado = req.session.usuarioLogueado;
        return res.redirect('/usuario/perfil/' + usuarioLogueado.id)
    }
    next();
}

module.exports = userMiddleware