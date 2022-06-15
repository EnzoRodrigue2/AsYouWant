
window.addEventListener("load", function() {
    let formulario = this.document.forms["register_form"];

    formulario.addEventListener("submit", function(e) {});
    
    let errors = [];

    let campoNombre = this.document.querySelector('input.nombre');
    if(campoNombre.value === ""){
        errors.push("Este campo no debe estar vacío");
    }else if(campoNombre.value < 2){
        errors.push("El nombre debe tener al menos 2 caracteres");
    };

    let campoApellido = this.document.querySelector('input.apellidos');
    if(campoApellido.value === ""){
        errors.push("Este campo no debe estar vacío");
    }else if(campoApellido.value < 2){
        errors.push("El apellido debe tener al menos 2 caracteres");
    };

    let campoEmail = this.document.querySelector('input.email');
    if(campoEmail.value === ""){
        errors.push("Este campo no debe estar vacío");
    };

    let campopassword = this.document.querySelector('input.contraseña');
    if(campopassword.value === ""){
        errors.push("Este campo no debe estar vacío");
    }else if(campopassword.value < 8){
        errors.push("La contraseña debe tener al menos 8 caracteres");
    };

    // let inputImagen = this.document.querySelector('input.imagen');
    // if(inputImagen){
    //     errors.push("La imagen debe ser un archivo válido")
    // };
    
    if(errors.length > 0) {
        e.preventDefault();
        let listaErrors = this.document.querySelector('div.errorsRegister ul');
        for(i=0; i<errors.length; i++){
            listaErrors.innerHTML = "<li> + errors[i] + </li>";
        }
    }

});
// alert(1);
