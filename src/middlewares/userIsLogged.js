function userIsLogged (req, res, next) {
    if(req.session.usuarioALoguearse){
        return res.redirect('/homeUser')
    }
    next();
}

module.exports = userIsLogged