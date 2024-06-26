function validarFormulario() {
    return validarUsuario() && validarContrasena() && validarDireccion() && validarComuna() && validarTelefono() && validarUrl() && validarAficiones();
}

// Validación de usuario
function validarUsuario() {
    var inputUsuario = document.getElementById("username");
    var divErrorUsuario = document.getElementById("error-usuario");
    var usuario = inputUsuario.value.trim();

    if (usuario === "") {
        mostrarError(divErrorUsuario, "El Nombre de usuario es obligatorio");
        return false;
    }
    if (usuario.length < 5 || usuario.length > 10) {
        mostrarError(divErrorUsuario, "El Nombre de usuario debe tener entre 5 y 10 caracteres");
        return false;
    }
    if (!esLetra(usuario.charAt(0))) {
        mostrarError(divErrorUsuario, "El Nombre de usuario debe comenzar con una letra");
        return false;
    }
    for (var i = 1; i < usuario.length; i++) {
        var char = usuario.charAt(i);
        if (!esLetra(char) && !esDigito(char)) {
            mostrarError(divErrorUsuario, "El Nombre de usuario no puede contener caracteres especiales");
        }
    }
    ocultarError(divErrorUsuario);
    return true;
}

function esLetra(caracter) {
    return (caracter >= 'a' && caracter <= 'z') || (caracter >= 'A' && caracter <= 'Z');
}

function esDigito(caracter) {
    return (caracter >= '0' && caracter <= '9');
}

function mostrarError(elemento, mensaje) {
    elemento.innerHTML = mensaje;
    elemento.className = "text-intense-danger mt-1";
}

function ocultarError(elemento) {
    elemento.innerHTML = "";
    elemento.className = "";
}

// Validación de contraseña
function validarContrasena() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var errorPassword = document.getElementById("error-contraseña");
    var errorConfirmPassword = document.getElementById("error-confirm-password");

    if (!validarContraseña(password, username)) {
        mostrarError(errorPassword, "La contraseña debe tener entre 3 y 6 caracteres, al menos un dígito y una letra, y no debe contener el nombre de usuario.");
        return false;
    }
    if (password !== confirmPassword) {
        mostrarError(errorConfirmPassword, "Las contraseñas no coinciden.");
        return false;
    }
    ocultarError(errorPassword);
    ocultarError(errorConfirmPassword);
    return true;
}

function validarContraseña(password, username) {
    if (password.length < 3 || password.length > 6) {
        return false;
    }
    var tieneLetra = false;
    var tieneDigito = false;
    for (var i = 0; i < password.length; i++) {
        var char = password.charAt(i);
        if (char >= '0' && char <= '9') {
            tieneDigito = true;
        }
        if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
            tieneLetra = true;
        }
    }
    
    if (password.includes(username)) {
        return false;
    }
    return tieneLetra && tieneDigito;
}

function mostrarError(elemento, mensaje) {
    elemento.innerHTML = mensaje;
    elemento.className = "text-intense-danger mt-1";
}

function ocultarError(elemento) {
    elemento.innerHTML = "";
    elemento.className = "";
}


// Validación de dirección
function validarDireccion() {
    var direccion = document.getElementById("address").value.trim();
    var errorDireccion = document.getElementById("error-direccion");

    if (direccion === "") {
        mostrarError(errorDireccion, "La dirección es obligatoria.");
        return false;
    }
    ocultarError(errorDireccion);
    return true;
}

// Validación de comuna
function validarComuna() {
    var seleccionComuna = document.getElementById("comuna");
    var errorComuna = document.getElementById("error-comuna");

    if (seleccionComuna.value === "") {
        mostrarError(errorComuna, "Debe seleccionar una comuna.");
        return false;
    }
    ocultarError(errorComuna);
    return true;
}

// Validación de teléfono
function validarTelefono() {
    var inputTelefono = document.getElementById("phone");
    var divErrorTelefono = document.getElementById("error-telefono");
    var telefono = inputTelefono.value.trim();
    var formatoTelefono = /^\+\d{2,3}\s\d{3,4}\s\d{4}$/;

    if (!formatoTelefono.test(telefono)) {
        mostrarError(divErrorTelefono, "El número de teléfono no tiene el formato correcto (+xxx xxxx xxxx)");
        return false;
    }
    ocultarError(divErrorTelefono);
    return true;
}

// Validación de sitio web
function validarUrl() {
    var inputWebsite = document.getElementById("website");
    var divErrorSitio = document.getElementById("error-sitio");
    var url = inputWebsite.value.trim();
    var formatoUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (!formatoUrl.test(url)) {
        mostrarError(divErrorSitio, "La URL no tiene un formato válido.");
        return false;
    }
    ocultarError(divErrorSitio);
    return true;
}

// Contador de aficiones
var numAficiones = 0;

// Validación de aficiones
function validarAficiones() {
    var errorAficiones = document.getElementById("error-aficiones");

    if (numAficiones < 2) {
        mostrarError(errorAficiones, "Debe ingresar al menos 2 aficiones.");
        return false;
    }
    ocultarError(errorAficiones);
    return true;
}

// Evento click del botón "Añadir"
document.getElementById("add-hobby").addEventListener("click", function() {
    var hobbyInput = document.getElementById("hobby-input");
    var hobby = hobbyInput.value.trim();
    if (hobby !== "") {
        var hobbiesList = document.getElementById("hobbies-list");
        var li = document.createElement("li");
        li.textContent = hobby;
        li.className = "hobby-item";
        hobbiesList.appendChild(li);
        hobbyInput.value = "";
        numAficiones++;
        validarAficiones();
    }
});
