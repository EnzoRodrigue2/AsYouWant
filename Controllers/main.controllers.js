const controller = {
    home :  function(req, res, next) {
      res.render('index', { title: 'Express' });
    },
    crear : function(req, res, next) {
      res.render('crear-producto');
    },
    editar : function(req, res, next) {
      res.render('editar-producto');
    }
};

module.exports = controller