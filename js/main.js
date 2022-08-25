let nadadores = [];
let carrito = [];
const carritoListado = new CarritoListado(carrito);
const listaNadadores = new ListaNadadores(nadadores);
const headDocument = document.getElementById("headDocument");
const printButton = document.getElementById("printButton");
const mainBody = document.getElementById("mainBody");
const creadorEventosBTN = document.getElementById("creadorEventosBTN");
const tiendaBTN = document.getElementById("tiendaBTN");
const pageName = document.getElementById("metaName");
//imprimir
printButton.addEventListener("click", () => {
  window.print();
});

//creador de eventos
creadorEventosBTN.addEventListener("click", () => {
  inicioCreadorEventos();
});
function inicioCreadorEventos() {
  pageName.innerText = "SISTEMA DE POSICIONES";
  mainBody.innerHTML = `<div class="contenedorEvento contenedorPieHeader" id="contenedorEvento">
                        <input type="text" id="nombreEvento" value="" placeholder="Nombre del evento">
                        <button class="boton" id="botonCC">CREAR EVENTO</button>
                      </div>
                      <div id="menuCompetidores" class="menuCompetidores"></div>
                      <div id="Carrera"></div>
                      <div id="tabla" class="table">
                      </div>`;
  botonCC.addEventListener("click", () => {
    crearCarrera();
  });
}
const CrearCarreraBTN = document.getElementById("botonCC");

//crear evento
function crearCarrera() {
  const nombreCarrera = document.getElementById("nombreEvento").value;
  if (nombreCarrera === null) {
    Swal.fire({
      title: "Nombre Invalido",
      text: "Ingrese un nombre valido para su evento",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else if (nombreCarrera === "") {
    Swal.fire({
      title: "Nombre Invalido",
      text: "Ingrese un nombre valido para su evento",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    const Carrera = document.getElementById(`Carrera`);
    Carrera.innerHTML = `<div class="carrera"><p> Evento "${nombreCarrera}" </p></div>`;
    const contenedorEvento = document.getElementById("contenedorEvento");
    contenedorEvento.innerHTML = `
                                  <button class="boton" id="botonAC">Agregar Competidor</button>
                                  <button class="boton" id="botonBC">Borrar Competidor</button>
                                  <button class="boton" id="botonRE">Reiniciar Evento</button>
                                  `;
    showMenu();
  }
}

//desplegarMenu
function showMenu() {
  const botonAC = document.getElementById("botonAC");
  botonAC.addEventListener("click", () => {
    crearNadador();
  });
  const botonBC = document.getElementById("botonBC");
  botonBC.addEventListener("click", () => {
    ingresarBorrarNadador();
  });
  const botonRE = document.getElementById("botonRE");
  botonRE.addEventListener("click", () => {
    reiniciarEvento();
  });
}

//crear nadador
function crearNadador() {
  menuCompetidores.setAttribute("class", "menuCompetidoresDesplegado");
  menuCompetidores.innerHTML = `<input type="text" class="posicion" id="posicion" value="" placeholder="posicion">
                                <input type="text" class="nombre" id="nombre" value="" placeholder="Nombre del competidor">
                                <input type="text" class="tiempo" id="tiempo" value="" placeholder="Tiempo">
                                <button class="boton" id="botonACN">Agregar Competidor</button>`;
  const botonACN = document.getElementById("botonACN");
  botonACN.addEventListener("click", () => {
    agregarNadador();
  });
  function agregarNadador() {
    let nombre = document.getElementById("nombre").value;
    let posicion = Number(document.getElementById("posicion").value);
    let tiempo = document.getElementById("tiempo").value;
    if (nombre === null) {
      Swal.fire({
        title: "Opcion Invalida",
        text: "Ingrese una opcion válida para continuar",
        icon: "question",
        confirmButtonText: "Aceptar",
      });
    } else if (nombre === "") {
      Swal.fire({
        title: "Nombre Invalido",
        text: "Ingrese un nombre valido para continuar",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      let nadador = new Nadador(
        listaNadadores.darCantidad() + 1,
        nombre,
        posicion,
        tiempo
      );
      listaNadadores.agregarNadador(nadador);
      listarNadadores();
    }
  }
}

//borrar nadador
function ingresarBorrarNadador() {
  menuCompetidores.setAttribute("class", "menuCompetidoresDesplegado");
  menuCompetidores.innerHTML = `<input type="text" class="nombre" id="nadadorABorrar" value="" placeholder="Nombre competidor a borrar">
                                <button class="boton" id="botonNAB">Borrar Competidor</button>`;
  const botonNAB = document.getElementById("botonNAB");
  botonNAB.addEventListener("click", () => {
    borrarNadador();
  });
  function borrarNadador() {
    let nadadorABorrar = document.getElementById("nadadorABorrar").value;
    listaNadadores.buscar(nadadorABorrar);
    listarNadadores();
  }
}

//listar nadadores
function listarNadadores() {
  let tablaNadadores = document.getElementById("tabla");
  tablaNadadores.innerHTML = "";
  listaNadadores.nadadores.sort(
    (nadador1, nadador2) => nadador1.posicion - nadador2.posicion
  );
  listaNadadores.nadadores.forEach((nadador) => {
    const tablaNadador = document.createElement("table");
    tablaNadador.innerHTML = `<th>${nadador.posicion}</th> <td class="nadador">${nadador.nombre}</td> <td class="tiempo">${nadador.tiempo}</td>`;
    tablaNadadores.appendChild(tablaNadador);
  });
  console.log(nadadores);
}

//reiniciarEvento
function reiniciarEvento() {
  menuCompetidores.setAttribute("class", "");
  menuCompetidores.innerHTML = "";
  let Carrera = document.getElementById(`Carrera`);
  Carrera.innerHTML = "";
  let contenedorEvento = document.getElementById("contenedorEvento");
  contenedorEvento.innerHTML = `<input type="text" id="nombreEvento" value="" placeholder="Nombre del evento">
                                <button class="boton" id="botonCC">CREAR EVENTO</button>`;
  botonCC.addEventListener("click", () => {
    crearCarrera();
  });
  nadadores = [];
  let tablaNadadores = document.getElementById("tabla");
  tablaNadadores.innerHTML = "";
}

//Abrir Tienda
tiendaBTN.addEventListener("click", () => {
  abrirTienda();
});
function abrirTienda() {
  pageName.innerText = "TIENDA DE NATACION";
  mainBody.innerHTML = `<div class="contenedorPieHeader headerTienda"> <div></div> <h1>Articulos de Natacion</h1> <button id="carritoBTN" class="carritoBTN carritoVacio"></button></div>
                      <div id="productosImpresos"></div>
                      <div id="carrito" class="carrito"><header><p>Carrito de compras</p> <button id="cerrarCarritoBTN" class="carritoBTN carritoCerrar"> </header> <div id="bodyCarrito"></div></div>`;
  importarProductos();
  let cerrarCarritoBTN = document.getElementById("cerrarCarritoBTN")
  cerrarCarritoBTN.addEventListener("click", () =>{cerrarCarrito()})
  let carritoBTN = document.getElementById("carritoBTN")
  carritoBTN.addEventListener("click", () =>{desplegarCarrito()})
  function desplegarCarrito(){
    const carritoDesplegado = document.getElementById ("carrito")
    carritoDesplegado.setAttribute("class","carritoDesplegado carrito")
    mainBody.appendChild (carritoDesplegado)
  }
  function cerrarCarrito(){
    const carritoCerrado = document.getElementById ("carrito")
    carritoCerrado.setAttribute("class","carrito")
    mainBody.appendChild (carritoCerrado)
  }
}


//Tienda Natacion
function importarProductos() {
  fetch("../data/merch.json")
    .then((response) => response.json())
    .then((json) => mostrarProductos(json))
    .then()
}

function mostrarProductos(productos) {
  productos.forEach((producto) => {
    mostrarProducto(producto);
  });
  iniciarCarrito()
}
function mostrarProducto(producto) {
  const productosImpresos = document.getElementById("productosImpresos");
  const tarjetaProducto = document.createElement("div");
  const productoPrecio = Number(producto.precioProducto);
  tarjetaProducto.className += "tarjetaProducto";
  tarjetaProducto.innerHTML = `<article class="imgProducto"><img class="imagenProducto" src="${producto.img}" alt="${producto.nombreProducto}"></article>
                            <h1 class="nombreProducto">${producto.nombreProducto}</h1>
                            <div class="contenedorPrecio"><p>AR$</p><h3 class="precioProducto">${productoPrecio}</h3></div>
                            <button class="addCartBTN"> Enviar al carrito</button>`;
  productosImpresos.appendChild(tarjetaProducto)
}

//Carrito

function iniciarCarrito(){
  getCartButton()
}
function getCartButton(){
  const addCartButtons = document.querySelectorAll(".addCartBTN")
  console.log(addCartButtons)
  addCartButtons.forEach((addCartBTN)=>{addtoCartClick(addCartBTN)})
}
function addtoCartClick(addCartBTN){
  addCartBTN.addEventListener("click", addtoCartClicked)
}
function addtoCartClicked(event){
  let botonCarrito = event.target;
  let item = botonCarrito.closest(".tarjetaProducto")
  let itemNombre = item.querySelector(".nombreProducto").textContent
  let itemPrecio = Number(item.querySelector(".precioProducto").textContent)
  let itemImagen = item.querySelector(".imagenProducto").src
  let itemCantidad = Number(1)
  let itemSubTotal = Number(item.querySelector(".precioProducto").textContent)
  console.log (itemNombre)
  añadirAlCarrito(itemNombre, itemPrecio, itemImagen, itemCantidad, itemSubTotal);
}
function añadirAlCarrito(itemNombre, itemPrecio, itemImagen,itemCantidad,itemSubTotal){
    let productoCarrito = new ProductoCarrito(
      itemNombre,
      itemPrecio,
      itemImagen,
      itemCantidad,
      itemSubTotal
    );
    carritoListado.agregarProductoCarrito(productoCarrito)
    imprimirEnCarrito()
    console.log(carrito)
}

function imprimirEnCarrito(){
  let carritoAImprimir = document.getElementById("bodyCarrito")
  carritoAImprimir.innerHTML= "";
  carritoListado.carrito.forEach((productoCarrito) => {
    const productoImpreso = document.createElement("div")
    productoImpreso.setAttribute("class","productoCarrito")
    productoImpreso.innerHTML = `<img class="imagenProductoCarrito" src="${productoCarrito.img}" alt="${productoCarrito.nombre}">
                                  <p  class="nombreProductoCarrito">${productoCarrito.nombre}</p>
                                  <div class="cantidadProductoCarrito"><button class="restarCantidadProducto">-</button><p>${productoCarrito.cantidad}</p><button class="sumarCantidadProducto">+</button></div>
                                  <p  class="totalPrecioProductoCarrito">${productoCarrito.subTotal}</p>
                                  <button class="eliminarProductoCarrito">X</button>
    `
    carritoAImprimir.appendChild(productoImpreso)
  })
}