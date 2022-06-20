import React, { Component} from "react";
// import PropTypes from 'prop-types';

class ListaProductos extends Component {

    constructor() {
        super()
        this.state = {
            curso: []
        }
    }


    componentDidMount(){
        fetch("/api/products/")
            .then(res => res.json())
            .then(res => {console.log(res)})
            .catch(error => {console.log(error)})
    }



    render() {
        console.log('funciono');
        let contenido;
        
        if(this.state.curso === ""){
            contenido = <p>Cargando</p>
        } else {
            contenido = <img src={this.state.curso} alt=""></img>
        }

        return (

            <div>
                {contenido}
            </div>
        )
    }
} 

export default ListaProductos;
