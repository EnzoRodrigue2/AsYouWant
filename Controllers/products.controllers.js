const { log } = require('console');
const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/cursosDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const searchForId = (id) => { products.filter(products => products.id == id)
    return products
};


const controller = {
    // index: {

    // },

    detalle: (req, res) => {
        let idProducto = req.params.id;
        let productDetail = searchForId(idProducto)
        productDetail = productDetail[0]
        res.render('info-producto-2',{productDetail} );
        
    },

    
    list: (req, res) => {
        res.render('info-producto-2' );
    },
    // detalle: {

    // },
    // detalleComentario: {
        
    // }
};

module.exports = controller;