const { log } = require('console');
const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/cursosDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const searchForId = (id) => { 
    let productos = products.filter(products => products.id == id);
    return productos
};

const searchForSimilar = (thisCategoria) => {
    let productosSugeridos = []
    for(var i=0; i < products.length; i++) {
        if (products[i].categoria.includes(thisCategoria)) {
            productosSugeridos.push(products[i])
        };
    }
    return productosSugeridos;
};


const controller = {
    // index: {

    // },

    detalle: (req, res) => {
        let idProducto = req.params.id;
        let productDetail = searchForId(idProducto)
        productDetail = productDetail[0]

        let thisCategoria = productDetail.categoria;
        let sugerencias= searchForSimilar(thisCategoria);
        console.log(sugerencias);
        res.render('info-producto-2',{productDetail,sugerencias} );
        
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