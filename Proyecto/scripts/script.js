
//Máscaras com Jquery

$(document).ready(function () {
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '00000000' : '00000000';
    }, spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

    if ($("#cep").length > 0) {
        $("#cep").mask('00000000');
    }
    if ($("#telefone").length > 0) {
        $('#telefone').mask(SPMaskBehavior, spOptions);
    }

});



//fetch para busca e preenchimento do endereço através da API viacep
// Os campos que devem ser preenchidos pelo fetch são selecionados pelo id do input e vinculados a uma variável
const inputCep = document.querySelector('#cep');
const resultadoLogradouro = document.querySelector('#logradouro');
const resultadoComplemento = document.querySelector('#complemento');
const resultadoBairro = document.querySelector('#bairro');
const resultadoCidade = document.querySelector('#departamento');
const resultadoEstado = document.querySelector('#municipio');


// Adicionado um eventListener para identificar quando o campo de inputCep for alterado e assim lidar com a busca, só inicia a funcao callback quando o usuario apertar enter ou tab no teclado e passar para o proximo campo
inputCep.addEventListener('change', handleSearch);

//função para busca do cep digitado
function handleSearch(event) {
    event.preventDefault();
    const cep = inputCep.value;
    buscaCep(cep);
}

//funcao para realizar o fetch e preencher cada campo com o valor do objeto json retornado pela funcao. 

function buscaCep(cep) {
    //replace utilizado para retirar a mascara e realizar a busca apenas com os digitos do input
    var cep = cep.replace(/\D/g, '');

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(cepJson => {
            resultadoLogradouro.value = cepJson.logradouro;
            resultadoComplemento.value = cepJson.complemento;
            resultadoBairro.value = cepJson.bairro;
            resultadoCidade.value = cepJson.localidade;
            resultadoEstado.value = cepJson.uf;
        })

}

// Validação preenchimento dos campos.

const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for (let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "* Por favor, llena este campo"
            },
            email: {
                valueMissing: "Email obligatorio",
                typeMismatch: "Por favor, llena este campo."
            },
            tel: {
                typeMismatch: "Por favor, llena este campo."
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function () {

        const error = verifyErrors()

        if (error) {
            const message = customMessage(error)

            field.style.borderColor = "#e14747";
            setCustomMessage(message)
        } else {
            field.style.borderColor = "#1ED271";
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)
    validation()

}

for (field of fields) {
    field.addEventListener("invalid", event => {
        // eliminar o bubble da mensagem de erro padrao do html
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}

// o alerta com a confirmacao do envio do formulario só será exibido se não houver erro no preenchimento. 
document.querySelector("form")
    .addEventListener("submit", event => {
        alert("Registro exitoso");

        event.preventDefault()
    })

$(document).ready(function () {
    // Ciudades por departamento
    var MunPorDe = {
        "1": ["Trinidad", "Riberalta", "Guayaramerin", "San Borja", "San Ignacio", "Rurrenabaque",
            "Santa Ana Del Yacuma", "Reyes", "San Andres", "Magdalena", "Santa Rosa",
            "San Joaquin", "Exaltacion", "Baures", "San Javier", "San Ramon", "Huacaraje", "Loreto",
            "Puerto Siles"],
        "2": ["Cochabamba", "Sacaba", "Quillacollo", "Villa Tunari", "Tiquipaya", "Colcapirhua",
            "Vinto", "Puerto Villaroel", "Sipe Sipe", "Entre Rios", "Punata", "Mizque", "Tapacari",
            "Independencia", "Aiquile", "Cliza", "Chimore", "Tiraque", "Shinahota", "Capinota",
            "Colomi", "Cocapata", "Arbieto", "Totora", "San Benito", "Morochata", "Pocona", "Arque",
            "Tacopaya", "Pojo"],
        "3": ["Sucre", "Yotala", "Poroma", "Presto", "El Villar", "Icla", "Tarabuco", "Villa Serrano",
            "Zudáñez", "Mojocoya", "Culpina", "Monteagudo", "Huacareta", "Villa Vaca Guzmán", "Camargo",
            "Villa Charcas", "Padilla", "Villa Alcalá", "Sopachuy", "Tomina", "Azurduy", "Macharetí",
            "Huacaya", "El Villar", "Icla", "San Lucas", "Huacareta", "Incahuasi", "Tarvita"],
        "4": ["Achacachi", "Achocalla", "Aucapata", "Batallas", "Cairoma", "Calacoto", "Calamarca", "Callapa",
            "Caquiaviri", "Charaña", "Chúa Cocani", "Collana", "Colquencha", "Colquiri", "Comanche", "Coripata",
            "Coro Coro", "Escoma", "Guanay", "Guaqui", "Huachacalla", "Huarina", "Humanata", "Ichoca",
            "Inquisivi", "Jesús de Machaca", "La Asunta", "Laja", "Licoma Pampa", "Malla", "Mecapaca", "Palca",
            "Palos Blancos", "Papel Pampa", "Pelechuco", "Pucarani", "Puerto Acosta", "Puerto Carabuco", "Puerto Pérez",
            "Quime", "San Andrés de Machaca", "San Buenaventura", "San Pedro de Curahuara", "Santiago de Callapa",
            "Sapahaqui", "Sica Sica", "Sorata", "Tacacoma", "Tacopaya", "Tambo Quemado", "Teoponte", "Tipuani",
            "Tito Yupanqui", "Umala", "Ventilla", "Viacha", "Villa Alota", "Yanacachi", "Yanahuaya", "Yolosa",
            "Zongo", "La Paz", "Copacabana", "Coroico", "Chulumani", "Irupana", "Caranavi", "Sorata", "Guanay",
            "Mapiri", "Teoponte", "San Buenaventura", "Puerto Acosta", "Aucapata", "Achocalla", "Chúa Cocani",
            "Batallas", "Sapahaqui", "Colquiri", "Huayllamarca", "Ayo Ayo", "Mecapaca", "San Pedro de Curahuara",
            "Charaña", "Viacha", "Luribay", "Charazani"],
        "5": ["Oruro", "Cercado", "Caracollo", "Huanuni", "Macha", "Santiago de Huari", "Eucaliptus", "Sabaya",
            "Turco", "Chipaya", "Choquecota", "Corque", "Andamarca", "Soracachi", "Santiago de Andamarca",
            "Pantijara", "Santuario de Quillacas", "Cruz de Machacamarca", "Poopó", "Challapata", "Mojinete",
            "Salinas de Garci Mendoza", "Curahuara de Carangas", "Challapata", "Salinas de Garci Mendoza",
            "Machacamarca", "La Rivera", "Esmeralda", "Pazña", "Antequera", "Huanuni", "Caracollo", "Poopó",
            "Santiago de Machaca"],
        "6": ["Cobija", "Porvenir", "Filotas", "Bolpebra", "El Sena", "Puerto Gonzalo Moreno", "Nueva Esperanza",
            "Santos Mercado", "Ingavi", "San Lorenzo", "Santa Rosa del Abuná", "Bella Flor", "Villa Nueva",
            "San Pedro", "San Pablo"],
        "7": ["Potosí", "Uyuni", "Villazón", "Villa Imperial de Potosí", "Colcha K", "Tupiza", "Yocalla",
            "Sacaca", "Tahua", "Tupiza", "San Pedro de Quemes", "Mojo", "Toro Toro", "Tinguipaya", "Tacobamba",
            "Pocoata", "Tomas Frias", "Yocalla", "Urmiri", "Uncía", "Tacobamba", "Tinguipaya", "Pocoata",
            "Ocurí", "Llallagua", "Colquechaca", "Acasio", "Betanzos", "Tacobamba", "Tinguipaya", "Pocoata",
            "Ocurí", "Llallagua", "Colquechaca", "Acasio", "Betanzos", "Atocha", "San Pedro de Buena Vista"],
        "8": ["Santa Cruz de la Sierra", "El Torno", "Porongo", "La Guardia", "Puerto Pailas", "Cotoca",
            "Warnes", "Yapacaní", "Fernández Alonso", "Colpa Bélgica", "Portachuelo", "Mineros", "Comarapa",
            "Samaipata", "Pampa Grande", "Mairana", "Camiri", "Charagua", "Gutierrez", "Cuevo", "Huacareta",
            "Roboré", "Chiquitos", "San Ignacio de Velasco", "San Matías", "San Rafael", "Concepción",
            "San Carlos", "San Javier", "Cuatro Cañadas", "San Ramón", "San Juan de Yapacaní",
            "San Antonio de Lomerío", "Ascensión de Guarayos", "El Puente", "San José de Chiquitos", "Lagunillas",
            "San Julián", "Saipina", "Cabezas", "San Pedro", "San Antonio de Oblitas", "Yotau", "San Pedro de Ycuamandiyú",
            "El Trigal", "Muyupampa", "Comarapa", "Cabezas", "San Pedro", "San Antonio de Oblitas", "Yotau",
            "San Pedro de Ycuamandiyú", "El Trigal", "Muyupampa"],
        "9": ["Tarija", "Yacuiba", "Villamontes", "Bermejo", "Caraparí", "Padcaya", "Entre Ríos", "Uriondo",
            "El Puente", "San Lorenzo", "Cercado"]

    };

    // Función para actualizar las ciudades cuando se selecciona un departamento
    $("#departamento").change(function () {
        var departamento = $(this).val();
        var municipios = MunPorDe[departamento];
        var options = "";
        if (municipios) {
            for (var i = 0; i < municipios.length; i++) {
                options += "<option value='" + municipios[i] + "'>" + municipios[i] + "</option>";
            }
        }
        $("#municipio").html(options);
    });
    // Establecer el primer departamento como seleccionado por defecto
    var PriDep = Object.keys(MunPorDe)[0];
    $("#departamento").val(PriDep).change();
});

$(document).ready(function () {
    // Función para guardar los datos del formulario en un array
    function guardarDatos() {
        var datos = {
            nombre: $("#nome").val(),
            email: $("#email").val(),
            telefono: $("#telefone").val(),
            cep: $("#cep").val(),
            barrio: $("#bairro").val(),
            numero: $("#numero").val(),
            vivienda: $("#vivienda").val(),
            departamento: $("#departamento").val(),
            ciudad: $("#municipio").val()
        };
        return datos;
    }

    // Evento cuando se envía el formulario
    $("#cadastro").submit(function (event) {
        // Prevenir el envío por defecto
        event.preventDefault();

        // Guardar los datos en un array
        var datosArray = guardarDatos();

        // Aquí puedes hacer lo que quieras con los datosArray, como enviarlos a un servidor, mostrarlos en la consola, etc.
        console.log(datosArray);
    });
});

$(document).ready(function () {
    // Al cargar la página, recuperar los datos del Local Storage y mostrarlos en la tabla
    mostrarDatosGuardados();

    $('#cadastro').submit(function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        var datos = obtenerDatosFormulario();

        // Guardar los datos en el Local Storage
        guardarDatosLocalStorage(datos);

        // Mostrar los datos en la tabla
        mostrarDatosEnTabla(datos);

        // Limpiar el formulario después de enviar
        $('#cadastro')[0].reset();
    });

    // Función para mostrar los datos guardados en el Local Storage al cargar la página
    function mostrarDatosGuardados() {
        var datosGuardados = JSON.parse(localStorage.getItem('datosGuardados'));
        if (datosGuardados) {
            datosGuardados.forEach(function (datos) {
                mostrarDatosEnTabla(datos);
            });
        }
    }

    // Función para obtener los valores del formulario
    function obtenerDatosFormulario() {
        var datos = {
            nombre: $('#nome').val(),
            email: $('#email').val(),
            telefono: $('#telefone').val(),
            cep: $('#cep').val(),
            barrio: $('#bairro').val(),
            numero: $('#numero').val(),
            vivienda: $('#vivienda option:selected').text(),
            departamento: $('#departamento option:selected').text(),
            ciudad: $('#municipio option:selected').text()
        };
        return datos;
    }

    // Función para guardar los datos en el Local Storage
    function guardarDatosLocalStorage(datos) {
        var datosGuardados = JSON.parse(localStorage.getItem('datosGuardados')) || [];
        datosGuardados.push(datos);
        localStorage.setItem('datosGuardados', JSON.stringify(datosGuardados));
    }

    // Función para mostrar los datos en la tabla
    function mostrarDatosEnTabla(datos) {
        var newRow = $('<tr>');
        newRow.append('<td>' + datos.nombre + '</td>');
        newRow.append('<td>' + datos.email + '</td>');
        newRow.append('<td>' + datos.telefono + '</td>');
        newRow.append('<td>' + datos.cep + '</td>');
        newRow.append('<td>' + datos.barrio + '</td>');
        newRow.append('<td>' + datos.numero + '</td>');
        newRow.append('<td>' + datos.vivienda + '</td>');
        newRow.append('<td>' + datos.departamento + '</td>');
        newRow.append('<td>' + datos.ciudad + '</td>');
        newRow.append('<td><button class="editar">Editar</button></td>');
        $('#datos-body').append(newRow);
    }
});



$(document).ready(function () {
   
    
    // Mostrar u ocultar la tabla de datos y los botones al hacer clic en el botón "Listar"
    $("button#listar").click(function () {
        $("#tabla-contenedor").toggle();
    });

    // Función para guardar los datos del formulario en un array
    function guardarDatos() {
        var datos = {
            nombre: $("#nome").val(),
            email: $("#email").val(),
            telefono: $("#telefone").val(),
            cep: $("#cep").val(),
            barrio: $("#bairro").val(),
            numero: $("#numero").val(),
            vivienda: $("#vivienda").val(),
            departamento: $("#departamento").val(),
            ciudad: $("#municipio").val()
        };
        return datos;
    }

    // Evento cuando se envía el formulario
    $("#cadastro").submit(function (event) {
        // Prevenir el envío por defecto
        event.preventDefault();

        // Guardar los datos en un array
        var datosArray = guardarDatos();

        // Aquí puedes hacer lo que quieras con los datosArray, como enviarlos a un servidor, mostrarlos en la consola, etc.
        console.log(datosArray);
    });

    // Al cargar la página, recuperar los datos del Local Storage y mostrarlos en la tabla
    mostrarDatosGuardados();

    $('#cadastro').submit(function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        var datos = obtenerDatosFormulario();

        // Guardar los datos en el Local Storage
        guardarDatosLocalStorage(datos);

        // Mostrar los datos en la tabla
        mostrarDatosEnTabla(datos);

        // Limpiar el formulario después de enviar
        $('#cadastro')[0].reset();
    });

    // Función para mostrar los datos guardados en el Local Storage al cargar la página
    function mostrarDatosGuardados() {
        var datosGuardados = JSON.parse(localStorage.getItem('datosGuardados'));
        if (datosGuardados) {
            datosGuardados.forEach(function (datos) {
                mostrarDatosEnTabla(datos);
            });
        }
    }

    // Función para obtener los valores del formulario
    function obtenerDatosFormulario() {
        var datos = {
            nombre: $('#nome').val(),
            email: $('#email').val(),
            telefono: $('#telefone').val(),
            cep: $('#cep').val(),
            barrio: $('#bairro').val(),
            numero: $('#numero').val(),
            vivienda: $('#vivienda option:selected').text(),
            departamento: $('#departamento option:selected').text(),
            ciudad: $('#municipio option:selected').text()
        };
        return datos;
    }

    // Función para guardar los datos en el Local Storage
    function guardarDatosLocalStorage(datos) {
        var datosGuardados = JSON.parse(localStorage.getItem('datosGuardados')) || [];
        datosGuardados.push(datos);
        localStorage.setItem('datosGuardados', JSON.stringify(datosGuardados));
    }

    // Función para mostrar los datos en la tabla
    function mostrarDatosEnTabla(datos) {
        var newRow = $('<tr>');
        newRow.append('<td>' + datos.nombre + '</td>');
        newRow.append('<td>' + datos.email + '</td>');
        newRow.append('<td>' + datos.telefono + '</td>');
        newRow.append('<td>' + datos.cep + '</td>');
        newRow.append('<td>' + datos.barrio + '</td>');
        newRow.append('<td>' + datos.numero + '</td>');
        newRow.append('<td>' + datos.vivienda + '</td>');
        newRow.append('<td>' + datos.departamento + '</td>');
        newRow.append('<td>' + datos.ciudad + '</td>');
        newRow.append('<td><button class="editar">Editar</button></td>');
        $('#datos-body').append(newRow);
    }

    // Limpiar toda la tabla de datos y los botones al hacer clic en el botón "Limpiar"
    $("button#limpiar").click(function () {
        $("#datos-body").empty();
    });

    // Habilitar la edición en la fila al hacer clic en el botón "Editar"
    $("table").on("click", "button.editar", function () {
        var fila = $(this).closest("tr");
        fila.find("td").each(function () {
            var contenido = $(this).text();
            $(this).html("<input type='text' value='" + contenido + "'>");
        });
        $(this).toggleClass("guardar").text("Guardar");
    });

    // Guardar los cambios al hacer clic en el botón "Guardar"
    $("table").on("click", "button.guardar", function () {
        var fila = $(this).closest("tr");
        fila.find("td input").each(function () {
            var contenido = $(this).val();
            $(this).parent().html(contenido);
        });
        $(this).toggleClass("guardar").text("Editar");
    });
});



