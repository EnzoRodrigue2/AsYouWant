import React, { Component} from "react";
// import PropTypes from 'prop-types';

class ListaProductos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            curso: ""
        }
    }

    apiCall(url, consecuencia){
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(error => console.log(error))
    }

    mostrarProductos = (data) => {
        console.log(data)
    }

    componentDidMount(){
        this.apiCall('http://localhost:3000/api/users/13', this.mostrarProductos)        
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
