const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/cursosDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
    // index: {

    // },

    detalle: (req, res) => {
        let productoEspecifico = products[(req.params.id)-1]
        res.render('info-producto',{productoEspecifico} );
    },

    
    list: {

    },
    // detalle: {

    // },
    // detalleComentario: {
        
    // }
};

module.exports = controller;