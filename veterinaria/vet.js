
let mascotas = [
  { id: 1, nombre: "gato", img: "gato.png" },
  { id: 2, nombre: "Perro", img: "perro.png" },
  { id: 3, nombre: "Hámster", img: "conejo.png" },
  { id: 4, nombre: "Conejo", img: "hamster.png" },
  { id: 5, nombre: "Ave", img: "ave.png" },
  { id: 6, nombre: "Pez", img: "pez.png" },
  { id: 7, nombre: "Serpiente", img: "serpiente.png" }
];
const mascota = [];
let op = null;
let indice = null;

//  

function cambiarImagenMascota(tipoMascota) {
  let imagenMascota = document.getElementById("imagenMascota");

  let mascotaInfo = mascotas.find(
    (m) => m.nombre.toLowerCase() === tipoMascota.toLowerCase()
  );

  if (mascotaInfo) {
    imagenMascota.src = mascotaInfo.img;
    imagenMascota.alt = `Imagen de un ${tipoMascota}`;
  } else {
    imagenMascota.src = ""; 
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
  } else if (  new Date().getFullYear() - new Date(document.getElementById("fecha").value).getFullYear() <18) {
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
      "Por favor ingrese una hora que esté entre las 8 am a 12pm y de 2pm a 5pm";
    showAlertt();
  } else {
    formulario();

    document.getElementById("contenedor").innerHTML=""
    pintar()

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
  let fragment = document.createDocumentFragment();

  mascota.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("container");

    let inicio1 = document.createElement("inicio1");
    inicio1.classList.add("inicio1");
    let hora1 = document.createElement("p");
    hora1.textContent = `Hora: ${item.hora}`;
    hora1.classList.add("p1");
    let fecha = document.createElement("p");
    fecha.textContent = `Fecha de cita: ${item.fecha}`;
    fecha.classList.add("p1");
    let numtel1 = document.createElement("p");
    numtel1.textContent = `Teléfono: ${item.numtel}`;
    numtel1.classList.add("p1");
    let propi1 = document.createElement("p");
    propi1.textContent = `Propietario: ${item.Propietario}`;
    propi1.classList.add("p1");
    let name1 = document.createElement("name1");
    name1.classList.add("name1"); 
    let img = document.createElement("img");
    let src = mascotas.find((mascota) => mascota.nombre === item.opciones)?.img;
    img.src = src ? src : "";
    img.alt = `Imagen de un ${item.opciones}`;
    img.classList.add('ima');
    let nombre1 = document.createElement("p");
    nombre1.textContent = `Nombre de la mascota: ${item.nombre}`;
    nombre1.classList.add("p1");
    let opciones1 = document.createElement("p");
    opciones1.textContent = `Mascota: ${item.opciones}`;
    opciones1.classList.add("p1");
    let documento1 = document.createElement("documento1");
    documento1.classList.add("documento1");
    let descripcion1 = document.createElement("p");
    descripcion1.textContent = `Síntomas que posee: ${item.descripcion}`;
    descripcion1.classList.add("p1");


    let editar = document.createElement("button");
    editar.textContent = "Editar";
    editar.addEventListener("click", () => {
      edita(item, index);
    });
    
    let eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";
    eliminar.addEventListener("click", () => {
      borrar(index);
    });

    inicio1.appendChild(fecha);
    inicio1.appendChild(hora1);
    inicio1.appendChild(numtel1);
    inicio1.appendChild(propi1);
    name1.appendChild(img);
    name1.appendChild(nombre1);
    name1.appendChild(opciones1);
    documento1.appendChild(descripcion1);
    div.appendChild(inicio1)
    div.appendChild(name1)
    div.appendChild(documento1)
    div.appendChild(editar);
    div.appendChild(eliminar);
    fragment.appendChild(div);
  });

  document.getElementById("contenedor").appendChild(fragment);
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

function borrar(i, x) {
  index = i;
  mascota.splice(index, 1);
  document.getElementById("container").innerHTML = "";
  pintar();
}
