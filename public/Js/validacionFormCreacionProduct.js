// window.addEventListener("load", function() {

//     let formulario = document.forms["crear_form"];


//     formulario.addEventListened("submit", function(e) {});

//     let errors =[];

//     let campoTitulo = document.querySelector('input.titulo');
//     if (campoTitulo.value == '') {
//     errors.push("El campo de titulo esta vacio")
//     };
//     console.log(campoTitulo);

//     let campoDescripcionCorta = document.querySelector('input.curso_descripcionCorta');
//     if (campoDescripcionCorta.value == '') {
//     errors.push("El campo de descripcion esta vacio")
//     };
//     console.log(campoDescripcionCorta);

//     let campoImagen = document.querySelector('input.curso_imagen');
//     if (campoImagen.value == '') {
//     errors.push("Debes colocar una imagen")
//     };
//     console.log(campoImagen);

//     let campoPrecio = document.querySelector('input.curso_precio');
//     if (campoPrecio.value == '') {
//     errors.push("Debes colocarle un precio al curso")
//     };
//     console.log(campoPrecio);

//     if (errors.length > 0) {
//         e.preventDefault();
//         let ulErrors = document.querySelector("div.errores ul");
//         for (i = 0; i < errors.length; i++) {
//             ulErrors.innerHTML += "<li> + errors[i] + </li>";
            
//         }
//     }
// })

alert(1);