function activar() {
  let ciforDiv = document.querySelector('.cifor');
  ciforDiv.style.display = (ciforDiv.style.display === 'none' || ciforDiv.style.display === '') ? 'block' : 'none';
}

let mascotas = [
  { id: 1, nombre: "gato", img: "gato.png" },
  { id: 2, nombre: "Perro", img: "perro.png" },
  { id: 3, nombre: "Hámster", img: "hamster.png" },
  { id: 4, nombre: "Conejo", img: "conejo.png" },
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

    let inicio2 = document.createElement("inicio2");
    inicio2.classList.add("inicio2");

    let fecha2 = document.createElement("p");
    fecha2.textContent = "fecha:";
    let fecha = document.createElement("p");
    fecha.innerHTML = `<input type='text' id="texto" value="${item.fecha}" readonly/>`
    // fecha.classList.add("p1");
    let inicio3 = document.createElement("inicio3");
    inicio3.classList.add("inicio3");
    let hora1 = document.createElement("p");
    hora1.innerHTML = `<input type='text' id="texto" value="${item.hora}" readonly/>`
    let hora2 = document.createElement("p");
    hora2.textContent = "hora:";
    // hora1.classList.add("p1");
    let inicio4 = document.createElement("inicio4");
    inicio4.classList.add("inicio4");
    let numtel1 = document.createElement("p");
    numtel1.innerHTML = `<input type='text' id="texto" value="${item.numtel}" readonly/>`
    let numtel2 = document.createElement("p");
    numtel2.textContent = "Teléfono:";
    // numtel1.classList.add("p1");
    let inicio5 = document.createElement("inicio5");
    inicio5.classList.add("inicio5");
    let propi1 = document.createElement("p");
    propi1.innerHTML = `<input type='text' id="texto" value="${item.Propietario}" readonly/>`
    let propi2 = document.createElement("p");
    propi2.textContent = "Dueño:";
    // propi1.classList.add("p1");
    let name1 = document.createElement("name1");
    name1.classList.add("name1"); 

    let img = document.createElement("img");
    let src = mascotas.find((mascota) => mascota.nombre === item.opciones)?.img;
    img.src = src ? src : "";
    img.alt = `Imagen de un ${item.opciones}`;
    img.classList.add("ima1");

    let name2 = document.createElement("name2");
    name2.classList.add("name2"); 

    let nombre2 = document.createElement("p");
    nombre2.textContent = "Nombre:";
    let nombre1 = document.createElement("p");
    nombre1.innerHTML = `<input type='text' id="texto" value="${item.nombre}" readonly/>`
    // nombre1.classList.add("p1");
    let opciones2 = document.createElement("p");
    opciones2.textContent = "Mascota";
    let opciones1 = document.createElement("p");
    opciones1.innerHTML = `<input type='text' id="texto" value="${item.opciones}" readonly/>`
    // opciones1.classList.add("p1");
    let documento1 = document.createElement("documento1");
    documento1.classList.add("documento1");
    let descripcion1 = document.createElement("p");
    descripcion1.textContent = `Síntomas que posee: ${item.descripcion}`;
    // descripcion1.classList.add("p1");

    let final1 = document.createElement("final1");
    final1.classList.add("final1");

    let editar = document.createElement("button");
    editar.textContent = "Editar";
    editar.addEventListener("click", () => {
      edita(item, index);
    });
    
    let escoger = document.createElement("p");
    escoger.innerHTML = `<select name="select" id="select" onchange="mostrar()">
    <option value="Abierto">Abierto</option>
    <option value="Cerrada">Cerrada</option>
    <option value="Anulada">Anulada</option>
    </select>`  
    escoger.onchange="mostrar()"

    inicio1.appendChild(inicio2);
    inicio1.appendChild(inicio3);
    inicio1.appendChild(inicio4);
    inicio1.appendChild(inicio5);
    inicio2.appendChild(fecha2);
    inicio2.appendChild(fecha);
    inicio3.appendChild(hora2);
    inicio3.appendChild(hora1);
    inicio4.appendChild(numtel2);
    inicio4.appendChild(numtel1);
    inicio5.appendChild(propi2);
    inicio5.appendChild(propi1);
    name1.appendChild(img);
    name1.appendChild(name2);
    name2.appendChild(nombre2);
    name2.appendChild(nombre1);
    name2.appendChild(opciones2);
    name2.appendChild(opciones1);
    documento1.appendChild(descripcion1);
    final1.appendChild(editar);
    final1.appendChild(escoger);
    div.appendChild(inicio1)
    div.appendChild(name1)
    div.appendChild(documento1);
    div.appendChild(final1)
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

  function mostrar(){
    alert(document.getElementById("select").value)
  }
  function mostraruno(){
    if(document.getElementById("abierta").checked){
    alert("citas abiertas")
    }if(document.getElementById("cerrada").checked){
    alert("citas cerradas" )
     } if(document.getElementById("anulada").checked){
    alert("citas anuladas") 
     }
  }



  let abiertas=[];

  let cerradas=[];

  let anuladas=[];


/* <select name="select" id="select" onchange="mostrar()">
<option value="python">python</option>
<option value="java">java</option>
<option value="javascript">javascript</option>
<option value="php">php</option>
</select>

<script>
  function mostrar(){
    alert(document.getElementById("select").value)
  }
  </script>   */
