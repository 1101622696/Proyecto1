  function showOptions(divId) {
    // Oculta todos los divs de opciones
    var optionsDivs = document.getElementsByClassName('options');
    for (var i = 0; i < optionsDivs.length; i++) {
      optionsDivs[i].style.display = 'none';
    }
    document.getElementById(divId).style.display = 'block';

    //incluir funciones de limpiar formularios
    limpiarFormulario();
    limpiarverpiloto();
    limpiarguardardron();
    limpiarverdron();
    limpiarmanteniminetodron();
    limpiaraprobacionvuelo();

    ocultardivminis();
    

  }

//-----------Funcion Ocultar Div Secundarios--------------------- 

  function ocultardivminis(){
    // incluir todos los subdivs grandes
     document.getElementById("AgregarPiloto").style.display = 'none';
     document.getElementById("VerPiloto").style.display = 'none';
     document.getElementById("AgregarDron").style.display = 'none';
     document.getElementById("VerDron").style.display = 'none';
     document.getElementById("MantenimientoDron").style.display = 'none';
  }

  function showOptions2(divId) {
    // Oculta todos los divs de opciones
    var optionsDivs = document.getElementsByClassName('options2');
    for (var i = 0; i < optionsDivs.length; i++) {
      optionsDivs[i].style.display = 'none';
    }

    // Muestra el div seleccionado
    document.getElementById(divId).style.display = 'block';

    //incluir funciones de limpiar formularios
    limpiarverpiloto();
    limpiarFormulario();
    limpiarguardardron();
    limpiarverdron();
    limpiarmanteniminetodron();
    limpiaraprobacionvuelo();


  }



//-----------Funcion Cerrar Sesion---------------------- 

  function cerrarSesion() {
// Llamada a Google Apps Script para cargar la plantilla de inicio de sesión
google.script.run.withSuccessHandler(function(result) {
  // Reemplazar el contenido de la página con la nueva interfaz HTML generada
  document.open();  
  document.write(result.html);  // Escribir el HTML recibido en la respuesta
  document.close();  // Cerrar el documento para finalizar
}).logoutAndRedirect();
}


//-----------Funcion Guardar Piloto---------------------- 

function guardarPiloto() {

// Capturar los valores del formulario
var nombreCompleto = document.getElementById("nombreCompleto").value;
var primerApellido= document.getElementById("primerApellido").value;
var segundoApellido= document.getElementById("segundoApellido").value;
var tipoDocumento= document.getElementById("tipoDocumento").value;
var identificacion= document.getElementById("identificacion").value;
var paisExpedicion= document.getElementById("paisExpedicion").value;
var ciudadExpedicion= document.getElementById("ciudadExpedicion").value;
var fechaExpedicion= document.getElementById("fechaExpedicion").value;
var paisNacimiento= document.getElementById("paisNacimiento").value;
var ciudadNacimiento= document.getElementById("ciudadNacimiento").value;
var fechaNacimiento= document.getElementById("fechaNacimiento").value;
var grupoSanguineo= document.getElementById("grupoSanguineo").value;
var factorRH= document.getElementById("factorRH").value;
var genero= document.getElementById("genero").value;
var estadoCivil= document.getElementById("estadoCivil").value;
var ciudadOrigen= document.getElementById("ciudadOrigen").value;
var direccion= document.getElementById("direccion").value;
var telefonoMovil= document.getElementById("telefonoMovil").value;
var email= document.getElementById("email").value;

let archivos = document.getElementById('adjuntos').files;


if (!nombreCompleto || !identificacion || !primerApellido || !email) {
  alert('Campos requeridos vacíos');
  return;
}

// Si hay archivos seleccionados
if (archivos.length > 0) {
  // Crear carpeta una vez en Google Drive
  google.script.run.withSuccessHandler(function(idcarpeta) {

    // Después de crear la carpeta, subir los archivos
    for (var i = 0; i < archivos.length; i++) {
      subirImagenNovedad(archivos[i], idcarpeta); // Subir cada archivo a la carpeta
    }



    // Guardar los datos del piloto después de subir los archivos
    guardarPilotoDatos(nombreCompleto, primerApellido, segundoApellido, tipoDocumento, identificacion, 
      paisExpedicion, ciudadExpedicion, fechaExpedicion, paisNacimiento, ciudadNacimiento, 
      fechaNacimiento, grupoSanguineo, factorRH, genero, estadoCivil, ciudadOrigen, direccion, 
      telefonoMovil, email, idcarpeta);

      limpiarFormulario();

  }).crearcarpeta(identificacion); // Llama a la función de Apps Script que crea la carpeta
} else {

  guardarPilotoDatos(nombreCompleto, primerApellido, segundoApellido, tipoDocumento, identificacion, 
    paisExpedicion, ciudadExpedicion, fechaExpedicion, paisNacimiento, ciudadNacimiento, 
    fechaNacimiento, grupoSanguineo, factorRH, genero, estadoCivil, ciudadOrigen, direccion, 
    telefonoMovil, email, null); // Aquí idcarpeta es null ya que no se suben archivos

    limpiarFormulario();


}
}


function guardarPilotoDatos(nombreCompleto, primerApellido, segundoApellido, tipoDocumento, identificacion, 
paisExpedicion, ciudadExpedicion, fechaExpedicion, paisNacimiento, ciudadNacimiento, 
fechaNacimiento, grupoSanguineo, factorRH, genero, estadoCivil, ciudadOrigen, direccion, 
telefonoMovil, email, idcarpeta) {

google.script.run.withSuccessHandler(function() {
  alert("Datos guardados correctamente.");
}).guardarPiloto(nombreCompleto, primerApellido, segundoApellido, tipoDocumento, identificacion, 
  paisExpedicion, ciudadExpedicion, fechaExpedicion, paisNacimiento, ciudadNacimiento, 
  fechaNacimiento, grupoSanguineo, factorRH, genero, estadoCivil, ciudadOrigen, direccion, 
  telefonoMovil, email, idcarpeta); // Llama a la función de Apps Script
}


//-----------Funcion Subior Adjuntos---------------------- 

function subirImagenNovedad(archivo, idcarpeta) {
let fr = new FileReader();
fr.readAsArrayBuffer(archivo);
fr.onload = function() {
  let imagen = {
    nombre: archivo.name,
    tipo: archivo.type,
    datos: Array.from(new Int8Array(this.result)) // Convierte el archivo a ArrayBuffer
  };
  google.script.run.procesarFormNovedades(imagen, idcarpeta); // Llama a la función para subir la imagen
};
}

//-----------Funcion Limpiar Formulario Piloto---------------------- 


function limpiarFormulario() {
var div = document.getElementById('AgregarPiloto'); // Selecciona el div que contiene el formulario

// Limpiar todos los campos de texto y fecha dentro del div
div.querySelectorAll('input[type="text"], input[type="date"], input[type="email"]').forEach(function(input) {
  input.value = '';
});

// Limpiar el campo de selección (select)
div.querySelectorAll('select').forEach(function(select) {
  select.value = ''; // Restablecer a la opción vacía
});

// Limpiar el campo de archivo
document.getElementById('adjuntos').value = '';
}

//------------Funcion Limpiar Ver Piloto---------------------- 


function limpiarverpiloto() {
var  contenedor = document.getElementById('VerPiloto'); // Selecciona el div que contiene el formulario

// Limpiar todos los elementos <span> dentro del contenedor
contenedor.querySelectorAll('span.indicator').forEach(function(span) {
  span.innerText = '';
});

// Restablecer todos los elementos <select> dentro del contenedor
contenedor.querySelectorAll('select').forEach(function(select) {
  select.value = '';
});

var enlaceAdjuntos = document.getElementById('adjuntos2');
enlaceAdjuntos.href = '#';
enlaceAdjuntos.textContent = '';

}

//------------Funcion Ver Pilotos en Select---------------------- 

function populateDropdown(data) {
      var dropdown = document.getElementById('identificador');
      dropdown.innerHTML = '<option value="">Seleccione una cedula</option>'; // Limpiar dropdown
      data.forEach(function(identifier) {
          var option = document.createElement('option');
          option.value = identifier;
          option.text = identifier; // Mostrar columna A - columna B
          dropdown.add(option);
      });
}

function onLoad() {
      google.script.run.withSuccessHandler(populateDropdown).getUniqueIdentifiers();
  }


function onIdentifierChange() {
  var identifier = document.getElementById('identificador').value;

  if (!identifier) {
     limpiarverpiloto();
  } else {
      // Extraer solo el código (primera parte antes del guion)
      var code = identifier.split(' - ')[0]; // Toma la primera parte del value
      google.script.run.withSuccessHandler(fillForm).getDataForIdentifier(code);
  }
}

//------------Funcion Traer datos de Sheet Piloto---------------------- 

function fillForm(datos) {

document.getElementById('nombreCompleto2').textContent = datos[1] || '';
document.getElementById('primerApellido2').textContent = datos[2] || '';
document.getElementById('segundoApellido2').textContent = datos[3] || '';
document.getElementById('tipoDocumento2').textContent = datos[4] || '';
document.getElementById('identificacion2').textContent = datos[5] || '';
document.getElementById('paisExpedicion2').textContent = datos[6] || '';
document.getElementById('ciudadExpedicion2').textContent = datos[7] || '';
document.getElementById('fechaExpedicion2').textContent = datos[8] || '';
document.getElementById('paisNacimiento2').textContent = datos[9] || '';
document.getElementById('ciudadNacimiento2').textContent = datos[10] || '';
document.getElementById('fechaNacimiento2').textContent = datos[11] || '';
document.getElementById('grupoSanguineo2').textContent = datos[12] || '';
document.getElementById('factorRH2').textContent = datos[13] || '';
document.getElementById('genero2').textContent = datos[14] || '';
document.getElementById('estadoCivil2').textContent = datos[15] || '';
document.getElementById('ciudadOrigen2').textContent = datos[16] || '';
document.getElementById('direccion2').textContent = datos[17] || '';
document.getElementById('telefonoMovil2').textContent = datos[18] || '';
document.getElementById('email2').textContent = datos[19] || '';

var url = datos[20] || ''; 

var enlaceAdjuntos = document.getElementById('adjuntos2');


if (url) {
enlaceAdjuntos.textContent = 'Enlace al archivo';
enlaceAdjuntos.href = url; // Si la URL existe, se asigna al href
} else {
enlaceAdjuntos.textContent = '';
enlaceAdjuntos.href = '#'; // Si no hay URL, se deja como un enlace vacío
}


}

//------------Funcion Eliminar Pilotos---------------------- 

function eliminarpiloto() {
// Obtener el valor del span donde está la identificación
var identificacion = document.getElementById('identificacion2').textContent;

 const identificadorSelect = document.getElementById('identificador');
 const selectedValue = identificadorSelect.value;

 if (selectedValue === "") {
     alert("Seleccione un piloto");
     return;
  }

google.script.run.withSuccessHandler(function() {
  alert("Piloto Eliminado Correctamente.");

   limpiarverpiloto();
   onLoad();
  
}).eliminarpiloto(identificacion);



}


//-------------------Funcion Agregar Dron-----------------------------------------

function guardarDron(){
var numeroSerie = document.getElementById("numeroSerie").value;
var marca = document.getElementById("marca").value;
var modelo = document.getElementById("modelo").value;
var peso = document.getElementById("peso").value;
var dimensiones = document.getElementById("dimensiones").value;
var autonomiaVuelo = document.getElementById("autonomiaVuelo").value;
var alturaMaxima = document.getElementById("alturaMaxima").value;
var velocidadMaxima = document.getElementById("velocidadMaxima").value;
var fechaCompra = document.getElementById("fechaCompra").value;
var capacidadBateria = document.getElementById("capacidadBateria").value;
var tipoCamarasSensores = document.getElementById("tipoCamarasSensores").value;

let archivos = document.getElementById('adjuntos3').files;

if (!numeroSerie || !marca || !modelo) {
  alert('Campos requeridos vacíos');
  return;
}

if (archivos.length > 0) {
  // Crear carpeta una vez en Google Drive
  google.script.run.withSuccessHandler(function(idcarpeta) {

    // Después de crear la carpeta, subir los archivos
    for (var i = 0; i < archivos.length; i++) {
      subirImagenNovedad(archivos[i], idcarpeta); // Subir cada archivo a la carpeta
    }



    // Guardar los datos del piloto después de subir los archivos
      guardarDronsheet(numeroSerie, marca, modelo, peso, dimensiones, autonomiaVuelo, alturaMaxima, velocidadMaxima, fechaCompra, capacidadBateria, tipoCamarasSensores,idcarpeta);

      limpiarguardardron();

  }).crearcarpetadron(numeroSerie); // Llama a la función de Apps Script que crea la carpeta
} else {
   guardarDronsheet(numeroSerie, marca, modelo, peso, dimensiones, autonomiaVuelo, alturaMaxima, velocidadMaxima, fechaCompra, capacidadBateria, tipoCamarasSensores,null);

   limpiarguardardron();

}

}


function guardarDronsheet(numeroSerie, marca, modelo, peso, dimensiones, autonomiaVuelo, alturaMaxima, velocidadMaxima, fechaCompra, capacidadBateria, tipoCamarasSensores,idcarpeta) {

google.script.run.withSuccessHandler(function() {
  alert("Datos guardados correctamente.");
}).guardarDron(numeroSerie, marca, modelo, peso, dimensiones, autonomiaVuelo, alturaMaxima, velocidadMaxima, fechaCompra, capacidadBateria, tipoCamarasSensores,idcarpeta); 
}



//------------Funcion Limpiar Guardar Dron---------------------- 


function limpiarguardardron() {
var  contenedor = document.getElementById('AgregarDron'); // Selecciona el div que contiene el formulario
var inputs = contenedor.getElementsByTagName('input'); 

for (var i = 0; i < inputs.length; i++) {
  if (inputs[i].type === "text" || inputs[i].type === "date") {
    inputs[i].value = ""; // Limpia los campos de texto y fecha
  }
}
document.getElementById('adjuntos3').value = '';

}

//---------------Funcion Traer datos de Sheet Dron---------------------

function populateDropdowndron(data) {
      var dropdown = document.getElementById('verserialdron');
      dropdown.innerHTML = '<option value="">Seleccione un Dron</option>'; // Limpiar dropdown
      data.forEach(function(identifier) {
          var option = document.createElement('option');
          option.value = identifier;
          option.text = identifier; // Mostrar columna A - columna B
          dropdown.add(option);
      });
}

function onLoaddron() {
      google.script.run.withSuccessHandler(populateDropdowndron).getUniqueIdentifiersdron();
  }


function onIdentifierChangedron() {
  var identifier = document.getElementById('verserialdron').value;

  if (!identifier) {
     limpiarverdron();
  } else {
      var code = identifier.split(' - ')[0]; // Toma la primera parte del value
      google.script.run.withSuccessHandler(fillFormdron).getDataForIdentifierdron(code);
  }
}

//------------Funcion Traer datos de Sheet Dron --------------------- 

function fillFormdron(datos) {

document.getElementById('numeroSerie2').textContent = datos[1] || '';
document.getElementById('marca2').textContent = datos[2] || '';
document.getElementById('modelo2').textContent = datos[3] || '';
document.getElementById('peso2').textContent = datos[4] || '';
document.getElementById('dimensiones2').textContent = datos[5] || '';
document.getElementById('autonomiaVuelo2').textContent = datos[6] || '';
document.getElementById('alturaMaxima2').textContent = datos[7] || '';
document.getElementById('velocidadMaxima2').textContent = datos[8] || '';
document.getElementById('fechaCompra2').textContent = datos[9] || '';
document.getElementById('capacidadBateria2').textContent = datos[10] || '';
document.getElementById('tipoCamarasSensores2').textContent = datos[11] || '';

var url = datos[12] || ''; 

var enlaceAdjuntos = document.getElementById('adjuntos4');

if (url) {
enlaceAdjuntos.textContent = 'Enlace al archivo';
enlaceAdjuntos.href = url; // Si la URL existe, se asigna al href
} else {
enlaceAdjuntos.textContent = '';
enlaceAdjuntos.href = '#'; // Si no hay URL, se deja como un enlace vacío
}


}


//------------Funcion Limpiar Ver Dron---------------------- 


function limpiarverdron() {
var  contenedor = document.getElementById('VerDron'); // Selecciona el div que contiene el formulario

// Limpiar todos los elementos <span> dentro del contenedor
contenedor.querySelectorAll('span.indicator').forEach(function(span) {
  span.innerText = '';
});

// Restablecer todos los elementos <select> dentro del contenedor
contenedor.querySelectorAll('select').forEach(function(select) {
  select.value = '';
});

var enlaceAdjuntos = document.getElementById('adjuntos4');
enlaceAdjuntos.href = '#';
enlaceAdjuntos.textContent = '';

}

//------------Funcion Eliminar Dron---------------------- 


function eliminardron() {
var serial = document.getElementById('numeroSerie2').textContent;


google.script.run.withSuccessHandler(function() {
    alert("Dron eliminado correctamente.");
    
    onLoaddron();
    limpiarverdron();

  }).withFailureHandler(function(error) {
    alert("Error al eliminar el dron: " + error.message);
  }).eliminardron(serial);
}


//---------------Funcion Traer Serial Mantenimiento Dron---------------------

function populateDropdownmantenimientodron(data) {
      var dropdown = document.getElementById('verserialdronmantenimiento');
      dropdown.innerHTML = '<option value="">Seleccione un Dron</option>'; // Limpiar dropdown
      data.forEach(function(identifier) {
          var option = document.createElement('option');
          option.value = identifier;
          option.text = identifier; // Mostrar columna A - columna B
          dropdown.add(option);
      });
}

function onLoadmanteniminetodron() {
      google.script.run.withSuccessHandler(populateDropdownmantenimientodron).getUniqueIdentifiersdron();
  }


//------------Funcion Limpiar Mantenimiento Dron---------------------- 


function limpiarmanteniminetodron() {
var  contenedor = document.getElementById('MantenimientoDron'); // Selecciona el div que contiene el formulario

// Limpiar todos los elementos <span> dentro del contenedor
contenedor.querySelectorAll('span.indicator').forEach(function(span) {
  span.innerText = '';
});

// Restablecer todos los elementos <select> dentro del contenedor
contenedor.querySelectorAll('select').forEach(function(select) {
  select.value = '';
});

}
//---------------Funcion Traer Serial Mantenimiento Dron---------------------

function populateDropdownmantenimientodron(data) {
      var dropdown = document.getElementById('verserialdronmantenimiento');
      dropdown.innerHTML = '<option value="">Seleccione un Dron</option>'; // Limpiar dropdown
      data.forEach(function(identifier) {
          var option = document.createElement('option');
          option.value = identifier;
          option.text = identifier; // Mostrar columna A - columna B
          dropdown.add(option);
      });
}

function onLoadmanteniminetodron() {
      google.script.run.withSuccessHandler(populateDropdownmantenimientodron).getUniqueIdentifiersdron();
  }


//---------------Funcion Traer Datos Tabla Aprobacion de Vuelos---------------------

function mostrarDatosPendientes() { 
google.script.run.withSuccessHandler(function(datosFiltrados) {
  // Referencia al div donde se mostrará la tabla
  var tablaDiv = document.getElementById('tablaDatosPendientes');
  
  // Comienza a construir la tabla HTML con clases de Bootstrap
  var html = '<table class="table table-striped table-bordered table-hover">';
  html += '<thead class="thead-dark"><tr>';
  html += '<th class="text-center">Consecutivo</th>';
  html += '<th class="text-center">Correo</th>';
  html += '<th class="text-center">Nombre Completo</th>';
  html += '<th class="text-center">Tipo de Operación</th>';
  html += '<th class="text-center">Empresa</th>';
  html += '<th class="text-center">Fecha Inicio</th>';
  html += '<th class="text-center">Hora Inicio</th>';
  html += '<th class="text-center">Fecha Fin</th>';
  html += '<th class="text-center">Hora Fin</th>';
  html += '<th class="text-center">Estado</th>';
  html += '</tr></thead>';
  html += '<tbody>';
  
  // Recorre los datos y crea filas para la tabla
  for (var i = 0; i < datosFiltrados.length; i++) {
    html += '<tr>';
    for (var j = 0; j < datosFiltrados[i].length; j++) {
      html += '<td>' + datosFiltrados[i][j] + '</td>';
    }
    html += '</tr>';
  }

  html += '</tbody></table>';
  
  // Inserta la tabla en el div
  tablaDiv.innerHTML = html;
}).obtenerDatosSolicitudVuelos(); // Llama a la función en Google Apps Script
}


//---------------Funcion Traer Id Solicitud de Vuelo---------------------

function populateDropdownidsolicitudvuelo(data) {
      var dropdown = document.getElementById('idvueloaprobarvuelo');
      dropdown.innerHTML = '<option value="">Seleccione una Solicitud de Vuelo:</option>'; // Limpiar dropdown
      data.forEach(function(identifier) {
          var option = document.createElement('option');
          option.value = identifier;
          option.text = identifier; // Mostrar columna A - columna B
          dropdown.add(option);
      });
}

function populateDropdowniddronsolicitudvuelo(data) {
      var dropdown = document.getElementById('iddronaprobarvuelo');
      dropdown.innerHTML = '<option value="">Seleccione un Dron:</option>'; // Limpiar dropdown
      data.forEach(function(identifier) {
          var option = document.createElement('option');
          option.value = identifier;
          option.text = identifier; // Mostrar columna A - columna B
          dropdown.add(option);
      });
}

function onLoadautorizarvuelo() {

      mostrarDatosPendientes();

      google.script.run.withSuccessHandler(populateDropdownidsolicitudvuelo).getidsolicitudvuelo();

      google.script.run.withSuccessHandler(populateDropdowniddronsolicitudvuelo).getUniqueIdentifiersdron();


  }


//---------------Aprobar Vuelo---------------------

function aprobarvuelo(){

 var idvueloaprobarvuelo = document.getElementById("idvueloaprobarvuelo").value;
 var iddronaprobarvuelo=document.getElementById("iddronaprobarvuelo").value;

 var iddron = iddronaprobarvuelo.split(' - ')[0];

 if (!idvueloaprobarvuelo) {
  alert('Campos requeridos vacíos');
  return;
}

google.script.run.withSuccessHandler(function() {
  alert("Vuelo Aprobado Correctamente.");
  
  limpiaraprobacionvuelo();

}).aprobarvuelo(idvueloaprobarvuelo,iddron);

}

//------------Funcion Limpiar Mantenimiento Dron---------------------- 


function limpiaraprobacionvuelo() {
var  contenedor = document.getElementById('AprobarVuelo'); // Selecciona el div que contiene el formulario

// Restablecer todos los elementos <select> dentro del contenedor
contenedor.querySelectorAll('select').forEach(function(select) {
  select.value = '';
});

 onLoadautorizarvuelo();

}


//---------------Denegar Vuelo---------------------

function denegarvuelo(){

 var idvueloaprobarvuelo = document.getElementById("idvueloaprobarvuelo").value;

 if (!idvueloaprobarvuelo) {
  alert('Campos requeridos vacíos');
  return;
}

google.script.run.withSuccessHandler(function() {
  alert("Vuelo Denegado Correctamente.");
  
  limpiaraprobacionvuelo();

}).denegarvuelo(idvueloaprobarvuelo);

}


//------------------Habilitar Edicion Pilotos--------

function habilitarEdicion() {

  const identificadorSelect = document.getElementById('identificador');
  const selectedValue = identificadorSelect.value;

 if (selectedValue === "") {
     alert("Seleccione un piloto");
     return;
  }


  document.getElementById('adjuntos2').style.display = 'none';
  document.getElementById('adjuntosLabel').style.display = 'none';
  document.getElementById('adjuntosModificarGroup').style.display = 'block';
  
  document.getElementById('modificarBtn').style.display = 'none';
  document.getElementById('eliminarBtn').style.display = 'none';
  document.getElementById('guardarBtn').style.display = 'inline';
  document.getElementById('cancelarBtn').style.display = 'inline';
}

function cancelarEdicion() {
  // Muestra el enlace de adjuntos y el label, oculta el input de adjuntos
  document.getElementById('adjuntos2').style.display = 'block';
  document.getElementById('adjuntosLabel').style.display = 'block';
  document.getElementById('adjuntosModificarGroup').style.display = 'none';
  
  // Restablece los botones
  document.getElementById('modificarBtn').style.display = 'inline';
  document.getElementById('eliminarBtn').style.display = 'inline';
  document.getElementById('guardarBtn').style.display = 'none';
  document.getElementById('cancelarBtn').style.display = 'none';
}


function guardarDatos() {
let archivos = document.getElementById('adjuntosmodificar').files;
const identificacionValue = document.getElementById("identificacion2").innerText;

if (archivos.length > 0) {
  // Crear carpeta y subir archivos si existen archivos adjuntos
  google.script.run.withSuccessHandler(function(idcarpeta) {
    
    for (let i = 0; i < archivos.length; i++) {
      subirImagenNovedad(archivos[i], idcarpeta); // Subir cada archivo a la carpeta
    }
  
    modificarpiloto(identificacionValue, idcarpeta);

  }).crearcarpeta(identificacionValue); 

} else {
  // Si no hay archivos, llama a modificarpiloto con idcarpeta como null
  modificarpiloto(identificacionValue, null);
}
}

function modificarpiloto(identificacion, idcarpeta) {

google.script.run.withSuccessHandler(function() {
  alert("Datos modificados correctamente.");

  // Actualiza la vista solo después de recibir la confirmación de éxito
  document.getElementById('adjuntos2').style.display = 'block';
  document.getElementById('adjuntosLabel').style.display = 'block';
  document.getElementById('adjuntosModificarGroup').style.display = 'none';
  
  // Restablece los botones
  document.getElementById('modificarBtn').style.display = 'inline';
  document.getElementById('eliminarBtn').style.display = 'inline';
  document.getElementById('guardarBtn').style.display = 'none';
  document.getElementById('cancelarBtn').style.display = 'none';

  limpiarverpiloto();
  onLoad();

}).modificarpiloto(identificacion, idcarpeta);
}
