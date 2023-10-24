const gastossem = [];

let op = null
let indice=null

function formulario() {

  let preciogastos=document.getElementById("preciogastos").value;
  let cantidad=document.getElementById("cantidad").value;

  if (op===true){
    gastossem[indice].preciogastos=document.getElementById("preciogastos").value
    gastossem[indice].cantidad=document.getElementById("cantidad").value
  }else{
    let usuario = {
      preciogastos: preciogastos,
      cantidad: cantidad,
    }
    
    gastossem.push(usuario)
        }
    document.getElementById("preciogastos").value = " ";
    document.getElementById("cantidad").value = " ";

    console.log(gastossem);

}
function agregar() {
  if (document.getElementById("preciogastos").value == "") {
    document.getElementById("alertt").textContent = "Por favor el producto en gastos esta vacio"
    setTimeout(() => {
        document.getElementById("alertt").textContent = ""
    }, 3000);
  } else if (document.getElementById("cantidad").value.length<3) {
    document.getElementById("alertt").textContent = "Por favor escriba la cantidad en numeros"
    setTimeout(() => {
        document.getElementById("alertt").textContent = ""
    }, 3000);
  }else {
      formulario();

     document.getElementById("tabla").innerHTML=""
pintar()

  }
}

function pintar(){
  let frag= document.createDocumentFragment()
  gastossem.forEach((item, index) => {
    let tr = document.createElement("tr")
    let td1 = document.createElement("td")
    let eliminar = document.createElement("button")
    eliminar.textContent="❌"
    eliminar.addEventListener("click",()=>{
    borrar(index)
  })
  td1.textContent=item.preciogastos
    td2.textContent=item.cantidad
    td9.appendChild(eliminar)
    document.getElementById("tabla").appendChild(frag)
  })
}
function borrar(i){
  index=i
  gastossem.splice(index, 1);
  document.getElementById("tabla").innerHTML=""
pintar()
}

function showAlert() {
       document.getElementById('alert').style.display = 'block';
   }

   function closeAlert() {
    if(document.getElementById('alerta').value==''){
      document.getElementById('validacion').textContent='escriba algo malparaido'
    }
   else{
       document.getElementById('alert').style.display = 'none';
       document.getElementById("escrito").textContent=parseInt(document.getElementById("alerta").value)
   }
   }


function cerraralerta() {
    document.getElementById('alertt').style.display = 'none';
}