const persona = [];

let op = null
let indice=null




function formulario() {

    let nombre=document.getElementById("nombre").value;
    let apellido=document.getElementById("apellido").value;
    let genero=document.querySelector('input[name="genero"]:checked').value;
    let correo=document.getElementById("correo").value;
    let fecha=document.getElementById("fecha").value;
    let opciones=document.getElementById("opciones").value;
    let ndoc=document.getElementById("ndoc").value;
    let numtel=document.getElementById("numtel").value;

    if (op===true){
      persona[indice].nombre=document.getElementById("nombre").value
      persona[indice].apellido=document.getElementById("apellido").value
      persona[indice].genero=document.querySelector('input[name="genero"]:checked').value
      persona[indice].correo=document.getElementById("correo").value
      persona[indice].fecha=document.getElementById("fecha").value
      persona[indice].opciones=document.getElementById("opciones").value
      persona[indice].ndoc=document.getElementById("ndoc").value
      persona[indice].numtel=document.getElementById("numtel").value
    }else{
let usuario = {
  nombre: nombre,
  apellido: apellido,
  genero: genero,
  correo: correo,
  fecha: fecha,
  opciones: opciones,
  ndoc: ndoc,
  numtel: numtel
}
    
persona.push(usuario)
    }
document.getElementById("nombre").value = " ";
document.getElementById("apellido").value = " ";
document.getElementById("hombre").checked = false ;
document.getElementById("mujer").checked = false;
document.getElementById("correo").value = " ";
document.getElementById("fecha").value = " ";
document.getElementById("opciones").value = " ";
document.getElementById("ndoc").value = " ";
document.getElementById("numtel").value = " ";

console.log(persona);

}

function validar() {
      let vericorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (document.getElementById("nombre").value == "") {
      document.getElementById("alert").textContent = "Por favor el nombre esta vacio"
      setTimeout(() => {
          document.getElementById("alert").textContent = ""
      }, 3000);
  } else if (document.getElementById("apellido").value == "") {
      document.getElementById("alert").textContent = "Por favor el apellido esta vacio"
      setTimeout(() => {
          document.getElementById("alert").textContent = ""
      }, 3000);
    }else if (!document.querySelector('input[name="genero"]:checked')) {
        document.getElementById("alert").textContent = "Por favor seleccione un genero"
        setTimeout(() => {
            document.getElementById("alert").textContent = ""
        }, 3000);
    }else if (!vericorreo.test(document.getElementById("correo").value)) {
      document.getElementById("alert").textContent = "Por favor el correo esta vacio"
      setTimeout(() => {
          document.getElementById("alert").textContent = ""
      }, 3000);
    }else if ((new Date().getFullYear() - new Date(document.getElementById("fecha").value).getFullYear()) < 18)  {
      document.getElementById("alert").textContent ="debe ser mayor para poder registrarse" 
      setTimeout(() => {
          document.getElementById("alert").textContent = ""
      }, 3000);
    } else if (document.getElementById("opciones").value == "selecciona un tipo de documento") {
      document.getElementById("alert").textContent = "Por favor seleccione una opcion"
      setTimeout(() => {
          document.getElementById("alert").textContent = ""
      }, 3000);
    } else if (document.getElementById("ndoc").value.length<7) {
        document.getElementById("alert").textContent = "Por favor escriba su número de documento"
        setTimeout(() => {
            document.getElementById("alert").textContent = ""
        }, 3000);
      } else if (document.getElementById("numtel").value.length<10) {
        document.getElementById("alert").textContent = "Por favor escriba su número de telefono"
        setTimeout(() => {
            document.getElementById("numtel").textContent = ""
        }, 3000)
  } else {
      formulario();

     document.getElementById("tabla").innerHTML=""
pintar()
op=false


  }
}

function pintar(){
  let frag= document.createDocumentFragment()


  persona.forEach((item, index) => {
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let td4 = document.createElement("td")
    let td5 = document.createElement("td")
    let td6 = document.createElement("td")
    let td7 = document.createElement("td")
    let td8 = document.createElement("td")
    let td9 = document.createElement("td")
    let editar = document.createElement("button")
    let eliminar = document.createElement("button")
    editar.textContent = "📝"
    editar.addEventListener("click",()=>{
      edita(item, index)
    })
    eliminar.textContent="❌"
    eliminar.addEventListener("click",()=>{
    borrar(index)
  })
    td1.textContent=item.nombre
    td2.textContent=item.apellido
    td4.textContent=item.genero
    td3.textContent=item.correo
    td5.textContent=item.opciones
    td6.textContent=item.ndoc
    td7.textContent=item.fecha
    td8.textContent=item.numtel
    td9.appendChild(editar)
    td9.appendChild(eliminar)
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tr.appendChild(td6)
    tr.appendChild(td7)
    tr.appendChild(td8)
    tr.appendChild(td9)
    frag.appendChild(tr)
    document.getElementById("tabla").appendChild(frag)
  })
}

function edita(r, i){
  op =  true
  indice=i
  console.log(r);
  document.getElementById("nombre").value=r.nombre
     document.getElementById("apellido").value=r.apellido
    document.getElementById("correo").value=r.correo
    if(r.genero==="hombre"){
      document.getElementById("hombre").checked=true
    }else{
      document.getElementById("mujer").checked=true
    }

    document.getElementById("opciones").value=r.opciones
    document.getElementById("ndoc").value=r.ndoc
    document.getElementById("fecha").value=r.fecha
    document.getElementById("numtel").value=r.numtel

}
function borrar(i){
  index=i
  persona.splice(index, 1);
  document.getElementById("tabla").innerHTML=""
pintar()
}
