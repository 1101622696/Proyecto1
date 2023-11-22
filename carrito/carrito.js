let productos = [
  {id:1, nombre:"camiseta para la temporada 2023 Real Madrid", precio:10000, img:"https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/06/14/16867313137408.jpg"},
  {id:2, nombre:"Camiseta suplente adidas del Real Madrid 2022/23", precio:5000, img:"https://img.planetafobal.com/2022/07/real-madrid-away-kit-2022-2023-adidas-wq.jpg"},
  {id:3, nombre:"Jersey Blanco del Real Madrid 2003-2004", precio:10000, img:"https://assets-es.imgfoot.com/media/cache/800x800/real-madrid-home-2003-2004-5ed1318670567.jpg"},
  {id:4, nombre:"Real Madrid CF Jerseys: 2005-2006 grey and black", precio:5000, img:"https://www.aworldofsoccer.com/jerseys/images/real_madrid_2006_third.jpg"},
  {id:5, nombre:"camisa de la segunda equipacion del real madrid 2023.", precio:10000, img:"https://media.futbolmania.com/media/catalog/product/cache/1/image/0f330055bc18e2dda592b4a7c3a0ea22/H/I/HI1656_camiseta-color-negro-adidas-3a-real-madrid-2022-2023_1_completa-frontal.jpg"},
  {id:6, nombre:"Jersey Azul Real madrid 2021 suplencia", precio:5000, img:"https://pbs.twimg.com/media/E56IBDtWQAAK8L0.jpg"},
  {id:7, nombre:"Camiseta del Real Madrid 2013-2014 3era", precio:10000, img:"https://i.pinimg.com/474x/38/2a/4a/382a4ae0b5089c607a9a4a33f64ee10c.jpg"},
  {id:8, nombre:"camiseta de la temporada 2008-2009 Real Madrid", precio:5000, img:"https://assets-es.imgfoot.com/media/cache/800x800/real-madrid-home-2008-2009.jpg"},
  {id:9, nombre:"2da Camiseta Real Madrid 2014-2015.", precio:5000, img:"https://assets-es.imgfoot.com/media/cache/800x800/real-madrid-third-2014-2015.jpg"},
  {id:10, nombre:"Camiseta morada Real Madrid 2016.", precio:5000, img:"https://http2.mlstatic.com/D_NQ_NP_869200-MLC54965761739_042023-V.jpg"},
  {id:11, nombre:"Camiseta Real Madrid 2017.", precio:5000, img:"https://down-co.img.susercontent.com/file/e537fddb6f128d1cb1866be2c491de22"},
  {id:12, nombre:"Camisa Adidas Real Madrid 2018 .", precio:5000, img:"https://static3.tcdn.com.br/img/img_prod/311840/camisa_adidas_real_madrid_third_2018_41280_1_20210806220652.jpg"},

] 



// function pintar() {
//   let fragment = document.createDocumentFragment();
//   productos.forEach((item,index)=>{
//       let div = document.createElement("div");
//       div.classList.add("cards");
//       let img = document.createElement("img");
//       img.classList.add('ima')
//       img.src= item.img
//       let h2 = document.createElement("h2");
//       h2.textContent = item.nombre
//       let p = document.createElement("p")
//       p.classList.add("precio");

//       let button = document.createElement("button")
//       button.textContent = "Agregar al carrito"
//       button.addEventListener("click",()=>{
//           console.log(item.id);
//       })
//       p.textContent = item.precio
//       div.appendChild(img)
//       div.appendChild(h2)
//       div.appendChild(p)
//       div.appendChild(button)
//       fragment.appendChild(div)

//   })

//   document.getElementById("container").appendChild(fragment)

// }

let carrito = [];

// Función para formatear el precio
function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(precio);
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  const productoEnCarrito = carrito.find(item => item.id === producto.id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  mostrarCarrito();
}

// Función para mostrar el carrito en el modal
function mostrarCarrito() {
  const carritoProductos = document.getElementById("carritoProductos");
  carritoProductos.innerHTML = "";

  carrito.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("producto-carrito");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.nombre}">
      <div>
        <h3>${item.nombre}</h3>
        <p>Precio: ${formatearPrecio(item.precio)}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Total: ${formatearPrecio(item.precio * item.cantidad)}</p>
      </div>
    `;
    carritoProductos.appendChild(div);
  });

  calcularTotal();
}

function calcularTotal() {
  const totalCarrito = document.getElementById("totalCarrito");
  const total = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  totalCarrito.textContent = formatearPrecio(total);
}

document.addEventListener("DOMContentLoaded", () => {
  function pintar() {
    let fragment = document.createDocumentFragment();
    productos.forEach((item,index)=>{
      let div = document.createElement("div");
      div.classList.add("cards");
      let img = document.createElement("img");
      img.classList.add('ima')
      img.src= item.img
      let h2 = document.createElement("h2");
      h2.textContent = item.nombre
      let p = document.createElement("p")
      p.classList.add("precio");

      let button = document.createElement("button")
      button.textContent = "Agregar al carrito"
      button.addEventListener("click",()=>{
        agregarAlCarrito(item);
      })
      p.textContent = formatearPrecio(item.precio);
      div.appendChild(img)
      div.appendChild(h2)
      div.appendChild(p)
      div.appendChild(button)
      fragment.appendChild(div)
    });

    document.getElementById("container").appendChild(fragment);
  }

  const carritoIcono = document.getElementById("logito");
  carritoIcono.addEventListener("click", () => {
    const carritoModal = document.getElementById("carritoModal");
    carritoModal.style.display = carritoModal.style.display === "block" ? "none" : "block";
    if (carritoModal.style.display === "block") {
      mostrarCarrito();
    }
  });

  // Evento para cerrar el carrito al hacer clic en la 'X'
  const cerrarCarrito = document.getElementById("cerrarCarrito");
  cerrarCarrito.addEventListener("click", () => {
    const carritoModal = document.getElementById("carritoModal");
    carritoModal.style.display = "none";
  });

  // Evento para vaciar el carrito
  const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
  vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    mostrarCarrito();
  });

  pintar(); // Llamar a la función para mostrar los productos al cargar la página
});
