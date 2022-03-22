const controller = {
    home :  function(req, res, next) {
      res.render('index', { title: 'Express' });
    },
    carrito : function(req, res, next) {
      res.render('carrito');
    }
};

module.exports = controller