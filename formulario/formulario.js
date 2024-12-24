
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa los tooltips de Bootstrap
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

let tooltipAbierto = null; // Variable para rastrear el tooltip abierto

function toggleTooltip(event) {
  const tooltip = event.currentTarget.querySelector('.tooltip-custom');

  // Si el tooltip actual ya está visible, lo oculta
  if (tooltip === tooltipAbierto) {
    tooltip.classList.remove('tooltip-visible'); // Ocultar tooltip
    tooltipAbierto = null; // Reiniciar variable
    return; // Detener aquí
  }

  // Cierra cualquier tooltip abierto antes de abrir uno nuevo
  if (tooltipAbierto) {
    tooltipAbierto.classList.remove('tooltip-visible');
  }

  // Muestra el nuevo tooltip
  tooltip.classList.add('tooltip-visible');
  tooltipAbierto = tooltip;

  // Detectar clic fuera del tooltip o cualquier campo
  function cerrarTooltipExterno(e) {
    // Si el clic no es dentro del tooltip o campo actual
    if (!event.currentTarget.contains(e.target)) {
      tooltip.classList.remove('tooltip-visible'); // Oculta el tooltip
      tooltipAbierto = null; // Reinicia la variable
      document.removeEventListener('click', cerrarTooltipExterno); // Quitar listener
    }
  }

  // Agregar el listener para cerrar al hacer clic fuera
  setTimeout(() => {
    document.addEventListener('click', cerrarTooltipExterno);
  });
}



  function ocultarDivs() {
    const divs = ['divsolicituddevuelo', 'divprevuelo', 'divreporte', 'divpostvuelo', 'divbitacoras'];
    divs.forEach(div => {
      document.getElementById(div).style.display = 'none';

      var form = document.getElementById('solicitudVueloForm');
      form.reset();
      resetFormularioCompleto(); 
    
    });
  }

  
 function mostrarDiv(divId) {
  // Mostrar el contenedor si está oculto
  document.getElementById('containerContent').style.display = 'block';
  
  ocultarDivs(); // Primero oculta todos los divs
  document.getElementById(divId).style.display = 'block'; 
  // Muestra el div seleccionado
}

function closeForm() {
  document.getElementById('divsolicituddevuelo').style.display = 'none';
  document.getElementById('divprevuelo').style.display = 'none';
  document.getElementById('divreporte').style.display = 'none';
}

function mostrarAlerta(mensaje, tipo = 'success') {
  const alertContainer = document.getElementById('alertContainer');
  const alertDiv = document.createElement('div');

  // Clase base para la alerta y su icono
  alertDiv.className = `alert alert-${tipo} d-flex align-items-center text-center alert-auto-hide`;
  const icono = tipo === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill';

  // Contenido de la alerta
  alertDiv.innerHTML = `
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="${tipo === 'success' ? 'Success' : 'Warning'}:">
      <use xlink:href="#${icono}"/>
    </svg>
    <div>${mensaje}</div>
  `;

  // Limpiar alertas previas y mostrar la nueva alerta
  alertContainer.innerHTML = '';
  alertContainer.appendChild(alertDiv);

  // Remover la alerta automáticamente después de 2.5 segundos (incluyendo tiempo de fade-out)
  setTimeout(() => {
    alertContainer.innerHTML = '';
  }, 2500);
}




function cerrarSesion() {
  // Llamada a Google Apps Script para cargar la plantilla de inicio de sesión
  google.script.run.withSuccessHandler(function(result) {
    // Reemplazar el contenido de la página con la nueva interfaz HTML generada
    document.open();  
    document.write(result.html);  // Escribir el HTML recibido en la respuesta
    document.close();  // Cerrar el documento para finalizar
  }).logoutAndRedirect();
}



  function mostrarOtros() {
    var proposito = document.getElementById("proposito").value;
    var otrosDiv = document.getElementById("otros_describir_div");

    if (proposito === "Otros") {
      otrosDiv.style.display = "block";
    } else {
      otrosDiv.style.display = "none";
    }
  }


  function toggleInput(checkboxId, fileInputId) {
    var checkbox = document.getElementById(checkboxId);
    var fileInput = document.getElementById(fileInputId);
    if (checkbox.checked) {
      fileInput.style.display = 'block';
    } else {
      fileInput.style.display = 'none';
    }
  }



//-----------------Función traer solicitudes aprobadas----------------------------------

  function cargarSolicitudes() {
    google.script.run.withSuccessHandler(mostrarSolicitudes).obtenerSolicitudesAprobadas();
  }

  // Mostrar las solicitudes aprobadas en la tabla
  function mostrarSolicitudes(data) {
    const solicitudesContainer = document.getElementById('solicitudes');
    solicitudesContainer.innerHTML = ''; // Limpiar el contenido

    if (!data.success) {
      solicitudesContainer.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    // Crear tabla de solicitudes aprobadas
    const table = document.createElement('table');
    table.border = '1';
    const headerRow = table.insertRow();
    headerRow.innerHTML = '<th>Consecutivo SAV</th><th>Fecha</th><th>CC Piloto</th>';

    data.solicitudes.forEach(solicitud => {
      const row = table.insertRow();
      row.innerHTML = `<td>${solicitud.consecutivo}</td><td>${solicitud.fecha}</td><td>${solicitud.cc}</td>`;
    });

    solicitudesContainer.appendChild(table);
  }


//-----------------Select para la cédula del piloto en la solicitud----------------------------------
document.addEventListener('DOMContentLoaded', () => {
  cargarPilotos(); // Llama a cargarPilotos al cargar la página
});

function cargarPilotos() {
  google.script.run
    .withSuccessHandler(llenarSelectPilotos)
    .withFailureHandler((error) => {
      console.error('Error al cargar pilotos:', error);
      mostrarAlerta('No se pudo cargar la lista de pilotos', "warning");
    })
    .getPilotosForSelect();
}

function llenarSelectPilotos(datosPilotos) {
  const select = document.getElementById('identificador');
  select.innerHTML = '<option value="">Seleccione un piloto</option>';

  datosPilotos.forEach((piloto) => {
    const option = document.createElement('option');
    option.value = piloto.identificador; // Cédula
    option.text = `${piloto.identificador} - ${piloto.nombre} ${piloto.apellido}`;
    select.appendChild(option);
  });
}

function onIdentifierChange() {
  const identifier = document.getElementById('identificador').value;

  if (!identifier) {
    limpiarverpiloto(); // Limpia los datos si no hay selección
    return;
  }

  google.script.run
    .withSuccessHandler(fillForm)
    .withFailureHandler((error) => {
      console.error('Error al obtener datos del piloto:', error);
      mostrarAlerta('No se pudieron cargar los datos del piloto', "warning");
    })
    .getDataForIdentifier(identifier);
}

function fillForm(datos) {
  if (datos && datos.length > 0) {
    document.getElementById('nombre_completo').value = datos[0]; // Nombre completo
    document.getElementById('tipo_documento').value = datos[1];  // Tipo de documento
    document.getElementById('numero_documento').value = datos[2]; // Número de documento
  } else {
    mostrarAlerta('No se encontraron datos para el piloto seleccionado', "warning");
  }
}


//-----------------Funcion Guardar Datos Solicitud Vuelo----------------------------------


  function guardarDatosSolicitudVuelo(event) {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  // Obtener los datos del formulario
  var form = document.getElementById('solicitudVueloForm');
  const pilotoSelect = document.getElementById('identificador');
  
  // Obtener identificador, nombre y apellido del piloto seleccionado
  const pilotoTexto = pilotoSelect.options[pilotoSelect.selectedIndex].text; 
  const pilotoDatos = pilotoTexto.split(' - '); // Divide el texto en partes
  const identificadorPiloto = pilotoDatos[0]; // Cédula
  const nombrePiloto = pilotoDatos[1];        // Nombre completo (incluye apellido)
  var formData = {
    useremail: form.useremail.value, 
    piloto: {
      identificador: identificadorPiloto, // Cédula del piloto
      nombre: nombrePiloto,              // Nombre y apellido del piloto
    },
    tipodeoperacionaerea: form.tipodeoperacionaerea.value,
    empresa: form.empresa.value,
    fecha_inicio: form.fecha_inicio.value,
    hora_inicio: form.hora_inicio.value,
    fecha_fin: form.fecha_fin.value,
    hora_fin: form.hora_fin.value,
    detalles_cronograma: form.detalles_cronograma.value,
    peso_maximo: form.peso_maximo.value,
    municipio: form.municipio.value,
    departamento: form.departamento.value,
    tipodecontactovisualconlaua: form.tipodecontactovisualconlaua.value,
    vueloespecial: form.vueloespecial.value,
    justificacionvueloespecial: form.justificacionvueloespecial.value,
    poligononombre: form.poligononombre.value,
    altura_poligono: form.altura_poligono.value,
    latitud_poligono_1: form.latitud_poligono_1.value,
    longitud_poligono_1: form.longitud_poligono_1.value,
    latitud_poligono_2: form.latitud_poligono_2.value,
    longitud_poligono_2: form.longitud_poligono_2.value,
    latitud_poligono_3: form.latitud_poligono_3.value,
    longitud_poligono_3: form.longitud_poligono_3.value,
    latitud_poligono_4: form.latitud_poligono_4.value,
    longitud_poligono_4: form.longitud_poligono_4.value,
    latitud_poligono_5: form.latitud_poligono_5.value,
    longitud_poligono_5: form.longitud_poligono_5.value,
    tramolinealnombre: form.tramolinealnombre.value,
    altura_tramo: form.altura_tramo.value,
    latitud_tramo_1: form.latitud_tramo_1.value,
    longitud_tramo_1: form.longitud_tramo_1.value,
    latitud_tramo_2: form.latitud_tramo_2.value,
    longitud_tramo_2: form.longitud_tramo_2.value,
    latitud_tramo_3: form.latitud_tramo_3.value,
    longitud_tramo_3: form.longitud_tramo_3.value,
    latitud_tramo_4: form.latitud_tramo_4.value,
    longitud_tramo_4: form.longitud_tramo_4.value,
    latitud_tramo_5: form.latitud_tramo_5.value,
    longitud_tramo_5: form.longitud_tramo_5.value,
    circuferenciaencoordenadayradionombre: form.circuferenciaencoordenadayradionombre.value,
    altura_circunferencia: form.altura_circunferencia.value,
    latitud_circunferencia_1: form.latitud_circunferencia_1.value,
    longitud_circunferencia_1: form.longitud_circunferencia_1.value,
    check_kmz: form.check_kmz.checked ? "Sí" : "No"
  };

  
      // Verificar si hay un archivo adjunto
      var fileInput = document.getElementById('file_kmz');
      if (fileInput.files.length > 0) {
        var file = fileInput.files[0]; // Obtener el archivo adjunto

        // Subir archivo a Google Drive
        var reader = new FileReader();
        reader.onload = function(e) {
          var base64Data = e.target.result.split(',')[1]; // Obtener los datos en base64
          google.script.run.withSuccessHandler(function(fileUrl) {
            // Agregar la URL del archivo al formData
            formData.file_kmz_url = fileUrl;

            // Enviar los datos del formulario a Google Apps Script
            google.script.run.withSuccessHandler(function() {
              form.reset();
              mostrarAlerta('Solicitud enviada correctamente.', "succes");
              document.getElementById('file_kmz').style.display = 'none';
            }).guardarSolicitudVuelo(formData);
          }).subirArchivoKMZ(file.name, base64Data);
        };
        reader.readAsDataURL(file); // Leer el archivo como base64
      } else {
        // Si no hay archivo adjunto, enviar solo los datos del formulario
        google.script.run.withSuccessHandler(function() {
          form.reset();
          mostrarAlerta('Solicitud enviada correctamente.', "succes");
          document.getElementById('file_kmz').style.display = 'none';
        }).guardarSolicitudVuelo(formData);
      }
    }

//--------------------Funcion Select Prevuelo-----------------

function populateDropdownselectprevuelo(data) {
        var dropdown = document.getElementById('solicitudesAprobadas');
        dropdown.innerHTML = '<option value="">Selecciona la solicitud de vuelo:</option>'; // Limpiar dropdown
        data.forEach(function(identifier) {
            var option = document.createElement('option');
            option.value = identifier;
            option.text = identifier; // Mostrar columna A - columna B
            dropdown.add(option);
        });
}


function onLoadprevuelo() {

        var email = document.getElementById('useremail2').value;
        google.script.run.withSuccessHandler(populateDropdownselectprevuelo).getsolicitudesvueloaprobadas(email);
       
    }

//---------------------Traer Datos a Prevuelo Primera Parte------------

function onIdentifierChangeprevuelo(){

    var identifier = document.getElementById('solicitudesAprobadas').value;

    if (!identifier) {
      //limpiar
    } else {
        var code = identifier.split(' - ')[0]; // Toma la primera parte del value
        console.log(code);
        google.script.run.withSuccessHandler(fillFormprevuelo).getDataForprevuelo(code);
    }

}

function fillFormprevuelo(datos) {

  console.log(datos);

  document.getElementById('piloto').textContent = datos[0] || '';
  document.getElementById('fecha').textContent = datos[1] || '';
  document.getElementById('ubicacion').textContent = datos[2] || '';
  document.getElementById('proposito').textContent = datos[3] || '';
  document.getElementById('permiso').textContent = datos[4] || '';
  document.getElementById('modelo').textContent = datos[5] || '';
}

//---------------------Guardar Datos Prevuelo-----------------
function guardarDatosPrevuelo(event) { 
  event.preventDefault(); 

  var form = document.getElementById('prevueloForm');
  var solicitudCompleta = form.solicitudesAprobadas.value;
  var solicitud = solicitudCompleta.substring(0, solicitudCompleta.indexOf(' -')); // Obtendrá "SAV-0001"

  var formData = {
    useremail: form.useremail2.value,
    solicitudesAprobadas: solicitud,
    piloto: document.getElementById('piloto').innerText,
    permiso: document.getElementById('permiso').innerText,
    fecha: document.getElementById('fecha').innerText,
    ubicacion: document.getElementById('ubicacion').innerText,
    modelo: document.getElementById('modelo').innerText,
    proposito: document.getElementById('proposito').innerText,
    autorizacion: document.getElementById('autorizacion').innerText,
    autorizado_por: document.getElementById('autorizado_por').innerText,
    fecha_autorizacion: document.getElementById('fecha_autorizacion').innerText,
    notas: form.notas.value
  };

  for (var i = 1; i <= 22; i++) {
    formData["item" + i] = form["item" + i].value;
  }

  google.script.run.withSuccessHandler(function() {
          resetFormularioCompleto();
          mostrarAlerta('Prevuelo Guardado Correctamente', "succes");
        }).guardarDatosPrevuelo(formData);

  console.log(formData);

}

//---------------------Limpiar Formulario Prevuelo

function resetFormularioCompleto() {
  // Restablecer el formulario
  var form = document.getElementById('prevueloForm');
  form.reset();
  
  // Limpiar los elementos <span> con la clase "indicator"
  var spans = form.querySelectorAll('.indicator');
  spans.forEach(function(span) {
    span.innerText = ''; // Borra el contenido de cada <span>
  });
}


document.addEventListener('DOMContentLoaded', function() {
  cargarDepartamentos();
});

function cargarDepartamentos() {
  const selectDepartamento = document.getElementById("departamento");

  // Verificar si el select está disponible en el DOM
  if (selectDepartamento) {
      for (let departamento in departamentosMunicipios) {
          const option = document.createElement("option");
          option.value = departamento;
          option.textContent = departamento;
          selectDepartamento.appendChild(option);
      }
  } else {
      console.error("Elemento departamento no encontrado");
  }
}

function actualizarMunicipios() {
  const selectDepartamento = document.getElementById("departamento");
  const selectMunicipio = document.getElementById("municipio");

  // Limpiar municipios previos
  selectMunicipio.innerHTML = '<option value="">Seleccione un municipio</option>';

  const departamentoSeleccionado = selectDepartamento.value;

  if (departamentoSeleccionado) {
      const municipios = departamentosMunicipios[departamentoSeleccionado];
      municipios.forEach(function(municipio) {
          const option = document.createElement("option");
          option.value = municipio;
          option.textContent = municipio;
          selectMunicipio.appendChild(option);
      });
  }
}
//---------------------Función descargar pdf de solicitud de vuelo


// ---------------------Función para cargar las solicitudes en el select
function cargarSolicitudesVuelo() {
  google.script.run.withSuccessHandler(function(solicitudes) {
    var select = document.getElementById('solicitudesVueloSelect');
    
    // Limpiar opciones existentes
    select.innerHTML = '<option value="">Seleccione una Solicitud de Vuelo</option>';
    
    // Agregar cada solicitud como una opción
    solicitudes.forEach(function(solicitud) {
      var option = document.createElement('option');
      option.value = solicitud.consecutivo;
      option.text = `Solicitud ${solicitud.consecutivo} - ${solicitud.estado}`;
      select.add(option);
    });
  }).obtenerListadoSolicitudes();
}

// ---------------------Función para descargar la solicitud seleccionada
function descargarSolicitud() {
  var select = document.getElementById('solicitudesVueloSelect');
  var identificadorSolicitud = select.value;
  
  if (identificadorSolicitud) {
    // Mostrar opciones de descarga
    google.script.run.withSuccessHandler(function(resultado) {
      if (resultado.success) {
        // Abrir PDF en nueva pestaña
        window.open(resultado.pdfUrl, '_blank');
      } else {
        alert(resultado.message);
      }
    }).generarPDFSolicitudVuelo(identificadorSolicitud);
  }
}

// Cargar solicitudes cuando se carga la página
window.onload = cargarSolicitudesVuelo;


//--------------------- Post Vuelo

function cargarSolicitudesEnSelect() {
  google.script.run.withSuccessHandler(function (solicitudes) {
    const select = document.getElementById('solicitudVueloSelect');
    solicitudes.forEach(solicitud => {
      const option = document.createElement('option');
      option.value = solicitud.id; // ID único de la solicitud
      option.textContent = `Solicitud ${solicitud.id} - ${solicitud.piloto}`; // Mostrar ID y nombre del piloto
      select.appendChild(option);
    });
  }).cargarSolicitudesAprobadas();
}

document.getElementById('solicitudVueloSelect').addEventListener('change', function () {
  const solicitudId = this.value;

  if (solicitudId) {
    google.script.run.withSuccessHandler(function (detalles) {
      document.getElementById('detallesSolicitud').innerHTML = `
        <p><strong>Propósito:</strong> ${detalles.propósito}</p>
        <p><strong>Dron:</strong> ${detalles.dron}</p>
        <p><strong>Piloto:</strong> ${detalles.Piloto}</p>
        <p><strong>Fecha:</strong> ${detalles.fecha}</p>
      `;
      window.pilotoId = detalles.pilotoId; // ID o nombre del piloto
      window.fechaId = detalles.fechaId
      window.dronId = detalles.dronId; 
    }).obtenerDetallesSolicitud(solicitudId);
  } else {
    document.getElementById('detallesSolicitud').innerHTML = '';
  }
});


function guardarPostvuelo() {
  let esValid = true; 
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = ''; 

  const solicitudSeleccionada = document.getElementById('solicitudVueloSelect').value;
  const horaInicio = document.getElementById('horaInicio').value;
  const horaFin = document.getElementById('horaFin').value;
  const distancia = document.getElementById('distanciaRecorrida').value.trim();
  const alturaMaxima = document.getElementById('alturaMáxima').value.trim();
  const incidentes = document.getElementById('incidentes').value.trim();
  const propositoAlcanzado = document.getElementById('propositoAlcanzado').value.trim();
  const observaciones = document.getElementById('observacionesVuelo').value.trim();

  if (!solicitudSeleccionada) {
    mostrarAlerta("Seleccione una solicitud de vuelo", "warning");
    esValid = false;
  }
  if (!horaInicio) {
    mostrarAlerta("Ingrese la hora de inicio del vuelo", "warning");
    esValid = false;
  }
  if (!horaFin) {
    mostrarAlerta("Ingrese la hora de fin del vuelo", "warning");
    esValid = false;
  }
  if (!distancia || isNaN(parseFloat(distancia)) || parseFloat(distancia) <= 0) {
    mostrarAlerta("Ingrese una distancia válida recorrida", "warning");
    esValid = false;
  }
  if (!alturaMaxima || isNaN(parseFloat(alturaMaxima)) || parseFloat(alturaMaxima) <= 0) {
    mostrarAlerta("Ingrese una altura máxima válida alcanzada", "warning");
    esValid = false;
  }
  if (!propositoAlcanzado) {
    mostrarAlerta("Indique si se alcanzó el propósito del vuelo", "warning");
    esValid = false;
  }
  const duracion = calcularDuracion(horaInicio, horaFin);

  if (esValid) {
    const datosFormulario = {
      solicitudSeleccionada,
      pilotoId: window.pilotoId, 
      dronId: window.dronId,
      fechaId: window.fechaId,   
      horaInicio,
      horaFin,
      duracion,
      distancia: parseFloat(distancia),
      alturaMaxima: parseFloat(alturaMaxima),
      incidentes,
      propositoAlcanzado,
      observaciones
    };

    google.script.run.withSuccessHandler(function (codigoPostvuelo) {
      mostrarAlerta(`Postvuelo guardado con código: ${codigoPostvuelo}`, "success");
      limpiarFormularioPostvuelo();
    }).guardarPostvuelo(datosFormulario);
  }
}

var detalles = obtenerDetallesSolicitud(consecutivo);
console.log(`Fecha: ${detalles.fecha}, Piloto: ${detalles.Piloto}, Dron: ${detalles.dron},`);

function limpiarFormularioPostvuelo() {
  document.getElementById('solicitudVueloSelect').value = '';
  document.getElementById('horaInicio').value = '';
  document.getElementById('horaFin').value = '';
  document.getElementById('distanciaRecorrida').value = '';
  document.getElementById('alturaMáxima').value = '';
  document.getElementById('incidentes').value = '';
  document.getElementById('propositoAlcanzado').value = '';
  document.getElementById('observacionesVuelo').value = '';
}


function calcularDuracion(horaInicio, horaFin) {
  const inicio = new Date(`2023-01-01T${horaInicio}`);
  const fin = new Date(`2023-01-01T${horaFin}`);

  const diferenciaMs = fin - inicio;

  const minutosTranscurridos = Math.floor(diferenciaMs / (1000 * 60));

  return minutosTranscurridos;
}

//------------------Bitácora
function cargarBitacoraVuelos() {
  google.script.run.withSuccessHandler(function(htmlFilas) {
    // Obtener el tbody de la tabla
    var tablaVuelos = document.getElementById('tabla-vuelos');
    
    // Insertar las filas generadas
    tablaVuelos.innerHTML = htmlFilas;
  }).obtenerBitacoraVuelos();
}

// Llamar a esta función cuando la página carga
document.addEventListener('DOMContentLoaded', cargarBitacoraVuelos);

// </script>
