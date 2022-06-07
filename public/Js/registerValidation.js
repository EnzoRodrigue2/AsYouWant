
window.addEventListener("load", function() {
    let formulario = this.document.forms["register_form"];

    formulario.addEventListener("submit", function(e) {});
    
    let errores = [];

    let campoNombre = this.document.querySelector('input.nombre');
    if(campoNombre.value === ""){
        errores.push("Este campo no debe estar vacío");
    }else if(campoNombre.value < 2){
        errores.push("El nombre debe tener al menos 2 caracteres");
    };

    let campoApellido = this.document.querySelector('input.apellido');
    if(campoApellido.value === ""){
        errores.push("Este campo no debe estar vacío");
    }else if(campoApellido.value < 2){
        errores.push("El apellido debe tener al menos 2 caracteres");
    };

    let campoEmail = this.document.querySelector('input.email');
    if(campoEmail.value === ""){
        errores.push("Este campo no debe estar vacío");
    };

    let campopassword = this.document.querySelector('input.contraseña');
    if(campopassword.value === ""){
        errores.push("Este campo no debe estar vacío");
    }else if(campopassword.value < 8){
        errores.push("La contraseña debe tener al menos 8 caracteres");
    };

    // let inputImagen = this.document.querySelector('input.imagen');
    // if(inputImagen){
    //     errores.push("La imagen debe ser un archivo válido")
    // };
    
    if(errores.length > 0) {
        e.preventDefault();
    }

});
// alert(1);
