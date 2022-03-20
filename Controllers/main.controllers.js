const controller = {
    home :  function(req, res, next) {
      res.render('index', { title: 'Express' });
    },
};

module.exports = controller