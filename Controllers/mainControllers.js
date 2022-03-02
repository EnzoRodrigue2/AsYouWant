const controller = {
    home :  (req, res) => {
        res.render(path.resolve(__dirname, './views/index.ejs'));

    },
    contactos : {

    },
    

};

module.exports = controller