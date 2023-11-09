let controlnumerico = /^[0-9]+$/;
let presupuesto = 0
let saldo = 0



function showAlert() {
  document.getElementById('alert').style.display = 'block';
}
function showAlertt() {
  document.getElementById('alertt').style.display = 'block';
}

function closeAlert() {

if (controlnumerico.test(document.getElementById('alerta').value)) {
 document.getElementById('alert').style.display = 'none';
 presupuesto = parseInt(document.getElementById("alerta").value);
 saldo = parseInt(document.getElementById("alerta").value);
 document.getElementById('escrito').textContent = presupuesto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
 document.getElementById('resta').textContent = saldo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

}
else {
 document.getElementById('validacion').textContent = "digite una cantidad para continuar"
}
}


function cerraralerta() {
document.getElementById('alertt').style.display = 'none';
}




const gastossem = [];

let op = null
let indice=null

function formulario(precio_gasto) {


    let usuario = {
      preciogastos: document.getElementById("preciogastos").value,
      cantidad: precio_gasto,
    }
    
    gastossem.push(usuario)
        
    document.getElementById("preciogastos").value = " ";
    document.getElementById("cantidad").value = " ";

    console.log(gastossem);
}

function agregar() {
  if (document.getElementById("preciogastos").value == "") {
    document.getElementById("alert-content2").textContent = "Por favor el producto en gastos esta vacio"
    showAlertt()

  } else if (controlnumerico.test(document.getElementById("cantidad").value)) {
    let precio_gasto = parseInt(document.getElementById("cantidad").value)


    if (saldo > 0) {
        if (saldo>=precio_gasto){
        formulario(precio_gasto)
        

     document.getElementById("tabla").innerHTML=""
pintar()
saldo = saldo - precio_gasto
            document.getElementById('resta').textContent = saldo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            document.getElementById("correcto").style.display = "flex"
            setTimeout(() => {
                document.getElementById("correcto").style.display = "none"
            }, 3000);
        }
        else{ document.getElementById("alert-content2").textContent = "saldo insuficiente para ese gasto"
        showAlertt()

        }
            if (saldo < 1) {
                document.getElementById("preinsu").style.display = "flex"

                const boton = document.getElementById('boton');

                boton.addEventListener('mouseover', function() {
                  boton.style.backgroundColor = 'rgb(49, 49, 49)';
                });
            }
        }
        else {
            document.getElementById("boton").disable = true
           
        }
        if (saldo <= 20000) {
            document.getElementById("conr").style.backgroundColor = "red"
        }

    }
    else {
        document.getElementById("alert-content2").textContent = "Por favor digite una cantidad"
        showAlertt()
    }

}

console.log(gastossem)


function pintar() {

  let frag= document.createDocumentFragment()
  gastossem.forEach((item, index) => {
    let tr = document.createElement("tr")

    let td1 = document.createElement("td")    
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let eliminar = document.createElement("button")
    eliminar.textContent="❌"
        eliminar.addEventListener("click",()=>{
    borrar(item, index)
  })
  td1.textContent=item.preciogastos
  td2.textContent=item.cantidad.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
  // td2.classList.add("valor_gasto");
  td3.appendChild(eliminar)
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)

  frag.appendChild(tr)
    document.getElementById("tabla").appendChild(frag)
  })
}
function borrar(i, x){
  index=i
  gastossem.splice(index, 1);
  document.getElementById("tabla").innerHTML=""
pintar()
saldo = saldo + i.cantidad
document.getElementById('resta').textContent = saldo.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
document.getElementById("preinsu").style.display = "none"
document.getElementById("conr").style.backgroundColor = "rgb(223, 170, 224)"
console.log(gastossem)
}
