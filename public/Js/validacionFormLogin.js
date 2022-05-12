window.addEventListener("load", function() {

    let formulario = document.forms["login_form"];


    formulario.addEventListened("submit", function(e) {});

    let errors =[];

    let campoNombre = document.querySelector('input.nombre');
    if (campoNombre.value == '') {
    errors.push("El campo de nombre esta vacio")
    };
    console.log(campoNombre);

    let campoEmail = document.querySelector('input.email');
    if (campoEmail.value == '') {
    errors.push("El campo de email esta vacio")
    };
    console.log(campoEmail);

    let campoPassword = document.querySelector('input.password');
    if (campoPassword.value == '') {
    errors.push("El campo de contraseña esta vacio")
    };
    console.log(campoPassword);

    if (errors.length > 0) {
        e.preventDefault();
        let ulErrors = document.querySelector("div.errores ul");
        for (i = 0; i < errors.length; i++) {
            ulErrors.innerHTML += "<li> + errors[i] + </li>";
            
        }
    }
})

