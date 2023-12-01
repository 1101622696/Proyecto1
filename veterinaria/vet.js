
// let mascotas = [
//   { id: 1, nombre: "gato", img: "gato.png" },
//   { id: 2, nombre: "Perro", img: "perro.png" },
//   { id: 3, nombre: "Hámster", img: "conejo.png" },
//   { id: 4, nombre: "Conejo", img: "hamster.png" },
//   { id: 5, nombre: "Ave", img: "ave.png" },
//   { id: 6, nombre: "Pez", img: "pez.png" },
//   { id: 7, nombre: "Serpiente", img: "serpiente.png" }
// ];

// const mascota = [];
// let op = null;
// let indice = null;

// // Modifica la función cambiarImagenMascota para que se llame al seleccionar una opción
// document.getElementById("opciones").addEventListener("change", function () {
//   cambiarImagenMascota(this.value);
// });

// function cambiarImagenMascota(tipoMascota) {
//   // Obtener la referencia del elemento de imagen
//   let imagenMascota = document.getElementById("imagenMascota");

//   // Buscar la información de la mascota en el array mascotas
//   let mascotaInfo = mascotas.find(
//     (m) => m.nombre.toLowerCase() === tipoMascota.toLowerCase()
//   );

//   // Obtener la referencia del contenedor de la imagen
//   let imagenMascotaContainer = document.getElementById("imagenMascotaContainer");


//   // Si se encuentra la información de la mascota, cambiar la fuente de la imagen
//   if (mascotaInfo) {
//     imagenMascota.src = mascotaInfo.img;
//     imagenMascota.alt = `Imagen de un ${tipoMascota}`;
//     // Mostrar el contenedor de la imagen
//     imagenMascotaContainer.style.display = 'block';
//   } else {
//     // Si no se encuentra la información, establecer una fuente predeterminada o limpiar la imagen
//     imagenMascota.src = ""; // Puedes establecer una fuente predeterminada o dejarla en blanco
//     imagenMascota.alt = "";
//     // Ocultar el contenedor de la imagen
//     imagenMascotaContainer.style.display = 'none';
//   }
// }

// function showAlertt() {
//   document.getElementById("alertt").style.display = "block";
// }

// function cerraralerta() {
//   document.getElementById("alertt").style.display = "none";
// }

// function formulario() {
//   let nombre = document.getElementById("nombre").value;
//   let Propietario = document.getElementById("Propietario").value;
//   let fecha = document.getElementById("fecha").value;
//   let opciones = document.getElementById("opciones").value;
//   let descripcion = document.getElementById("descripcion").value;
//   let numtel = document.getElementById("numtel").value;
//   let hora = document.getElementById("hora").value;

//   if (op === true) {
//     mascota[indice].nombre = document.getElementById("nombre").value;
//     mascota[indice].Propietario = document.getElementById("Propietario").value;
//     mascota[indice].fecha = document.getElementById("fecha").value;
//     mascota[indice].opciones = document.getElementById("opciones").value;
//     mascota[indice].descripcion = document.getElementById("descripcion").value;
//     mascota[indice].numtel = document.getElementById("numtel").value;
//     mascota[indice].hora = document.getElementById("hora").value;
//   } else {
//     let usuario = {
//       nombre: nombre,
//       Propietario: Propietario,
//       fecha: fecha,
//       opciones: opciones,
//       descripcion: descripcion,
//       numtel: numtel,
//       hora: hora,
//     };

//     mascota.push(usuario);
//   }

//   document.getElementById("nombre").value = "";
//   document.getElementById("Propietario").value = "";
//   document.getElementById("fecha").value = "";
//   document.getElementById("opciones").value = "";
//   document.getElementById("descripcion").value = "";
//   document.getElementById("numtel").value = "";
//   document.getElementById("hora").value = "";

//   console.log(mascota);
// }

// function validar() {
//   if (document.getElementById("nombre").value == "") {
//     document.getElementById("alert-content2").textContent =
//       "Por favor digite el nombre";
//     showAlertt();
//   } else if (document.getElementById("Propietario").value == "") {
//     document.getElementById("alert-content2").textContent =
//       "Por favor digite el nombre del Propietario";
//     showAlertt();
//   } else if (
//     new Date().getFullYear() - new Date(document.getElementById("fecha").value).getFullYear() < 18
//   ) {
//     document.getElementById("alert-content2").textContent =
//       "Por favor digite la fecha, debe tener más de 18";
//     showAlertt();
//   } else if (document.getElementById("opciones").value == "seleccione") {
//     document.getElementById("alert-content2").textContent =
//       "Por favor seleccione una opcion";
//     showAlertt();
//   } else if (document.getElementById("descripcion").value.length < 3) {
//     document.getElementById("alert-content2").textContent =
//       "Por favor escriba los síntomas de su mascota";
//     showAlertt();
//   } else if (document.getElementById("numtel").value.length < 10) {
//     document.getElementById("alert-content2").textContent =
//       "Por favor digite su número de teléfono";
//     showAlertt();
//   } else if (
//     !validarFormatoHora(document.getElementById("hora").value) ||
//     !validarHoraEnIntervalo(document.getElementById("hora").value)
//   ) {
//     document.getElementById("alert-content2").textContent =
//       "Por favor ingrese una hora válida";
//     showAlertt();
//   } else {
//     formulario();

//     document.getElementById("container").innerHTML = "";
//     pintar();
//     op = false;
//   }
// }

// function validarFormatoHora(hora) {
//   const formatoHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
//   return formatoHora.test(hora);
// }

// function validarHoraEnIntervalo(hora) {
//   const horaObj = obtenerObjetoHora(hora);
//   const intervalo1Inicio = obtenerObjetoHora("08:00");
//   const intervalo1Fin = obtenerObjetoHora("12:00");
//   const intervalo2Inicio = obtenerObjetoHora("14:00");
//   const intervalo2Fin = obtenerObjetoHora("17:00");

//   const enIntervalo1 =
//     compararHoras(horaObj, intervalo1Inicio) >= 0 &&
//     compararHoras(horaObj, intervalo1Fin) <= 0;
//   const enIntervalo2 =
//     compararHoras(horaObj, intervalo2Inicio) >= 0 &&
//     compararHoras(horaObj, intervalo2Fin) <= 0;

//   return enIntervalo1 || enIntervalo2;
// }

// function obtenerObjetoHora(hora) {
//   const [horas, minutos] = hora.split(":");
//   return { horas: parseInt(horas, 10), minutos: parseInt(minutos, 10) };
// }

// function compararHoras(hora1, hora2) {
//   if (hora1.horas !== hora2.horas) {
//     return hora1.horas - hora2.horas;
//   } else {
//     return hora1.minutos - hora2.minutos;
//   }
// }

// function pintar() {
//   let frag = document.createDocumentFragment();

//   mascota.forEach((item, index) => {
//     let tr = document.createElement("tr");
//     let td1 = document.createElement("td");
//     let td2 = document.createElement("td");
//     let td3 = document.createElement("td");
//     let td4 = document.createElement("td");
//     let td5 = document.createElement("td");
//     let td6 = document.createElement("td");
//     let td7 = document.createElement("td");
//     let td8 = document.createElement("td");
//     let img = document.createElement("img");
//     img.src = mascotas.find((mascota) => mascota.nombre === item.opciones)?.img;
//     img.alt = "Imagen de la mascota";
//     img.classList.add('ima');
//     let editar = document.createElement("button");
//     let eliminar = document.createElement("button");
//     editar.textContent = "📝";
//     editar.addEventListener("click", () => {
//       edita(item, index);
//     });
//     eliminar.textContent = "❌";
//     eliminar.addEventListener("click", () => {
//       borrar(index);
//     });
//     td1.appendChild(img);
//     td2.textContent = item.nombre;
//     td3.textContent = item.Propietario;
//     td4.textContent = item.numtel;
//     td5.textContent = item.descripcion;
//     td6.textContent = item.fecha;
//     td7.textContent = item.hora;
//     td8.appendChild(editar);
//     td8.appendChild(eliminar);
//     tr.appendChild(td1);
//     tr.appendChild(td2);
//     tr.appendChild(td3);
//     tr.appendChild(td4);
//     tr.appendChild(td5);
//     tr.appendChild(td6);
//     tr.appendChild(td7);
//     tr.appendChild(td8);
//     frag.appendChild(tr);
//     document.getElementById("container").appendChild(frag);
//   });
// }

// function edita(r, i) {
//   op = true;
//   indice = i;
//   console.log(r);
//   document.getElementById("nombre").value = r.nombre;
//   document.getElementById("Propietario").value = r.Propietario;
//   document.getElementById("opciones").value = r.opciones;
//   document.getElementById("descripcion").value = r.descripcion;
//   document.getElementById("fecha").value = r.fecha;
//   document.getElementById("numtel").value = r.numtel;
//   document.getElementById("hora").value = r.hora;
// }

// function borrar(i) {
//   index = i;
//   mascota.splice(index, 1);
//   document.getElementById("container").innerHTML = "";
//   pintar();
// }



let mascotas = [
  { id: 1, nombre: "gato", img: "gato.png" },
  { id: 2, nombre: "perro", img: "perro.png" },
  { id: 3, nombre: "hasmter", img: "conejo.png" },
  { id: 4, nombre: "conejo", img: "hamster.png" },
  { id: 5, nombre: "ave", img: "ave.png" },
  { id: 6, nombre: "pez", img: "pez.png" },
  { id: 7, nombre: "serpiente", img: "serpiente.png" },
];

const mascota = [];
let op = null;
let indice = null;

// Modifica la función cambiarImagenMascota para que se llame al seleccionar una opción
document.getElementById("opciones").addEventListener("change", function () {
  cambiarImagenMascota(this.value);
});

function cambiarImagenMascota(tipoMascota) {
  // Obtener la referencia del elemento de imagen
  let imagenMascota = document.getElementById("imagenMascota");

  // Buscar la información de la mascota en el array mascotas
  let mascotaInfo = mascotas.find(
    (m) => m.nombre.toLowerCase() === tipoMascota.toLowerCase()
  );

  // Si se encuentra la información de la mascota, cambiar la fuente de la imagen
  if (mascotaInfo) {
    imagenMascota.src = mascotaInfo.img;
    imagenMascota.alt = `Imagen de un ${tipoMascota}`;
  } else {
    // Si no se encuentra la información, establecer una fuente predeterminada o limpiar la imagen
    imagenMascota.src = ""; // Puedes establecer una fuente predeterminada o dejarla en blanco
    imagenMascota.alt = "";
  }
}

function showAlertt() {
  document.getElementById("alertt").style.display = "block";
}

function cerraralerta() {
  document.getElementById("alertt").style.display = "none";
}

function formulario() {
  let nombre = document.getElementById("nombre").value;
  let Propietario = document.getElementById("Propietario").value;
  let fecha = document.getElementById("fecha").value;
  let opciones = document.getElementById("opciones").value;
  let descripcion = document.getElementById("descripcion").value;
  let numtel = document.getElementById("numtel").value;
  let hora = document.getElementById("hora").value;

  if (op === true) {
    mascota[indice].nombre = document.getElementById("nombre").value;
    mascota[indice].Propietario = document.getElementById("Propietario").value;
    mascota[indice].fecha = document.getElementById("fecha").value;
    mascota[indice].opciones = document.getElementById("opciones").value;
    mascota[indice].descripcion = document.getElementById("descripcion").value;
    mascota[indice].numtel = document.getElementById("numtel").value;
    mascota[indice].hora = document.getElementById("hora").value;
  } else {
    let usuario = {
      nombre: nombre,
      Propietario: Propietario,
      fecha: fecha,
      opciones: opciones,
      descripcion: descripcion,
      numtel: numtel,
      hora: hora,
    };

    mascota.push(usuario);
  }

  document.getElementById("nombre").value = "";
  document.getElementById("Propietario").value = "";
  document.getElementById("fecha").value = "";
  document.getElementById("opciones").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("numtel").value = "";
  document.getElementById("hora").value = "";

  console.log(mascota);
}

function validar() {
  if (document.getElementById("nombre").value == "") {
    document.getElementById("alert-content2").textContent =
      "Por favor digite el nombre";
    showAlertt();
  } else if (document.getElementById("Propietario").value == "") {
    document.getElementById("alert-content2").textContent =
      "Por favor digite el nombre del Propietario";
    showAlertt();
  } else if (
    new Date().getFullYear() -
      new Date(document.getElementById("fecha").value).getFullYear() <
    18
  ) {
    document.getElementById("alert-content2").textContent =
      "Por favor digite la fecha, debe tener más de 18";
    showAlertt();
  } else if (document.getElementById("opciones").value == "seleccione") {
    document.getElementById("alert-content2").textContent =
      "Por favor seleccione una opcion";
    showAlertt();
  } else if (document.getElementById("descripcion").value.length < 3) {
    document.getElementById("alert-content2").textContent =
      "Por favor escriba los síntomas de su mascota";
    showAlertt();
  } else if (document.getElementById("numtel").value.length < 10) {
    document.getElementById("alert-content2").textContent =
      "Por favor digite su número de teléfono";
    showAlertt();
  } else if (
    !validarFormatoHora(document.getElementById("hora").value) ||
    !validarHoraEnIntervalo(document.getElementById("hora").value)
  ) {
    document.getElementById("alert-content2").textContent =
      "Por favor ingrese una hora válida";
    showAlertt();
  } else {
    formulario();
    let nuevoContenedor = document.createElement("div");
    nuevoContenedor.className = "formulario";

    // Aquí puedes agregar más contenido al nuevo contenedor si es necesario
    // Por ejemplo, puedes agregar etiquetas <p> con la información, imágenes, etc.

    // Insertar el nuevo contenedor justo después del contenedor original
    document.getElementById("container").insertAdjacentElement("afterend", nuevoContenedor);
    // Crear un nuevo contenedor con los datos llenados
    nuevoContenedor.className = "formulario";
    nuevoContenedor.innerHTML = `
      <div class="inicio">
        <div class="1">
          <label for="fecha" id="fecha1">Fecha</label>
          <input type="text" value="${mascota[mascota.length - 1].fecha}" readonly />
        </div>
        <div class="1">
          <label for="fecha" id="hora1">Hora</label>
          <input type="text" value="${mascota[mascota.length - 1].hora}" readonly />
        </div>
        <div class="1">
          <label for="doc">Telefono</label>
          <input type="text" value="${mascota[mascota.length - 1].numtel}" readonly />
        </div>
        <div class="1">
          <label for="Propietario">Propietario</label>
          <input type="text" value="${mascota[mascota.length - 1].Propietario}" readonly />
        </div>
      </div>
      <div class="name">
        <div class="ima">
          <img id="imagenMascota" src="${mascotas.find(
            (m) => m.nombre === mascota[mascota.length - 1].opciones
          )?.img}" alt="Imagen de la mascota" />
        </div>
        <div class="nombre">
          <label for="nombre">Nombre de la mascota</label>
          <input type="text" value="${mascota[mascota.length - 1].nombre}" readonly />
        </div>
      </div>
      <div class="documento">
        <div class="descripcion">
          <label for="descripcion">Sintomas de la mascota</label>
          <textarea readonly>${mascota[mascota.length - 1].descripcion}</textarea>
        </div>
      </div>
    `;

    // Insertar el nuevo contenedor después del contenedor actual
    document.body.insertBefore(
      nuevoContenedor,
      document.body.firstChild.nextSibling
    );

    // Limpiar el formulario actual
    op = false;
  }
}

function validarFormatoHora(hora) {
  const formatoHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return formatoHora.test(hora);
}

function validarHoraEnIntervalo(hora) {
  const horaObj = obtenerObjetoHora(hora);
  const intervalo1Inicio = obtenerObjetoHora("08:00");
  const intervalo1Fin = obtenerObjetoHora("12:00");
  const intervalo2Inicio = obtenerObjetoHora("14:00");
  const intervalo2Fin = obtenerObjetoHora("17:00");

  const enIntervalo1 =
    compararHoras(horaObj, intervalo1Inicio) >= 0 &&
    compararHoras(horaObj, intervalo1Fin) <= 0;
  const enIntervalo2 =
    compararHoras(horaObj, intervalo2Inicio) >= 0 &&
    compararHoras(horaObj, intervalo2Fin) <= 0;

  return enIntervalo1 || enIntervalo2;
}

function obtenerObjetoHora(hora) {
  const [horas, minutos] = hora.split(":");
  return { horas: parseInt(horas, 10), minutos: parseInt(minutos, 10) };
}

function compararHoras(hora1, hora2) {
  if (hora1.horas !== hora2.horas) {
    return hora1.horas - hora2.horas;
  } else {
    return hora1.minutos - hora2.minutos;
  }
}

function pintar() {
  let frag = document.createDocumentFragment();

  mascota.forEach((item, index) => {
    let tr = document.createElement("div");
    tr.className = "formulario";
    let divInicio = document.createElement("div");
    divInicio.className = "inicio";
    let divName = document.createElement("div");
    divName.className = "name";
    let divIma = document.createElement("div");
    divIma.className = "ima";
    let img = document.createElement("img");
    img.src = mascotas.find((mascota) => mascota.nombre === item.opciones)?.img;
    img.alt = "Imagen de la mascota";
    img.classList.add("ima");
    let divNombre = document.createElement("div");
    divNombre.className = "nombre";
    let divDocumento = document.createElement("div");
    divDocumento.className = "documento";
    let divDescripcion = document.createElement("div");
    divDescripcion.className = "descripcion";
    let editar = document.createElement("button");
    let eliminar = document.createElement("button");
    editar.textContent = "📝";
    editar.addEventListener("click", () => {
      edita(item, index);
    });
    eliminar.textContent = "❌";
    eliminar.addEventListener("click", () => {
      borrar(index);
    });

    // Llenar la sección de inicio
    divInicio.innerHTML = `
      <div class="1">
        <label for="fecha" id="fecha1">Fecha</label>
        <input type="text" value="${item.fecha}" readonly />
      </div>
      <div class="1">
        <label for="fecha" id="hora1">Hora</label>
        <input type="text" value="${item.hora}" readonly />
      </div>
      <div class="1">
        <label for="doc">Telefono</label>
        <input type="text" value="${item.numtel}" readonly />
      </div>
      <div class="1">
        <label for="Propietario">Propietario</label>
        <input type="text" value="${item.Propietario}" readonly />
      </div>
    `;

    // Llenar la sección de nombre e imagen
    divNombre.innerHTML = `
      <label for="nombre">Nombre de la mascota</label>
      <input type="text" value="${item.nombre}" readonly />
    `;
    divIma.appendChild(img);

    // Llenar la sección de Sintomas
    divDescripcion.innerHTML = `
      <label for="descripcion">Sintomas de la mascota</label>
      <textarea readonly>${item.descripcion}</textarea>
    `;

    // Agregar botones de editar y eliminar
    let divBotones = document.createElement("div");
    divBotones.appendChild(editar);
    divBotones.appendChild(eliminar);

    // Agregar todo al contenedor
    divName.appendChild(divIma);
    divName.appendChild(divNombre);
    divDocumento.appendChild(divDescripcion);
    tr.appendChild(divInicio);
    tr.appendChild(divName);
    tr.appendChild(divDocumento);
    tr.appendChild(divBotones);

    frag.appendChild(tr);
    document.getElementById("container").appendChild(frag);
  });
}

function edita(r, i) {
  op = true;
  indice = i;
  console.log(r);
  document.getElementById("nombre").value = r.nombre;
  document.getElementById("Propietario").value = r.Propietario;
  document.getElementById("opciones").value = r.opciones;
  document.getElementById("descripcion").value = r.descripcion;
  document.getElementById("fecha").value = r.fecha;
  document.getElementById("numtel").value = r.numtel;
  document.getElementById("hora").value = r.hora;
}

function borrar(i) {
  index = i;
  mascota.splice(index, 1);
  document.getElementById("container").innerHTML = "";
  pintar();
}
