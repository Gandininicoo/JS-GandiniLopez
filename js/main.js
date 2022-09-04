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
let headerBienvenida = document.getElementById("headerBienvenida");
definirNombreCliente()

let abrirTiendaBody = document.getElementById("tiendaBody")
abrirTiendaBody.addEventListener("click", () => {
  abrirTienda();
});
let abrirEventosBody = document.getElementById("eventosBody")
abrirEventosBody.addEventListener("click", () => {
  inicioCreadorEventos();
});

function ingresarNombreCliente(){(async () => {
  let { value: nombreCliente } = await Swal.fire({
    title: 'Ingresa tu nombre',
    input: 'text',
    inputLabel: 'Bienvenido a nik-01, para continuar debe ingresar su nombre',
    inputPlaceholder: 'Ingresa tu nombre',
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off'
    }})
    if (nombreCliente === ""){
      definirNombreCliente()
    }
    else if(nombreCliente === undefined){
      definirNombreCliente()
    }
    else{
      headerBienvenida.innerHTML = `<h1>¡BIENVENIDO ${nombreCliente}!</h1>`
      localStorage.setItem("nombreCliente", nombreCliente)
    }
})()
}

function definirNombreCliente() {
  const nombreCliente = localStorage.getItem("nombreCliente")
  if (nombreCliente === null || ""){
  ingresarNombreCliente()}
  else{
    headerBienvenida.innerHTML = `<h1>¡BIENVENIDO DE NUEVO ${nombreCliente}!</h1>`
  }
  return nombreCliente
}

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
                      <div class="bodyTable"><table id="tabla" class="table">
                      </table></div>
                      <div class="barraExportarExcel"> <input type="button" id="botonExportar" value="Exportar evento a excel"> </div>`;
  botonCC.addEventListener("click", () => {
    crearCarrera();
  });
  let botonEventoExportar =  document.getElementById("botonExportar")
  botonEventoExportar.addEventListener("click", () => {tableToExcel('tabla', 'evento')})
}
const CrearCarreraBTN = document.getElementById("botonCC");

//crear evento
function crearCarrera() {
  const nombreCarrera = document.getElementById("nombreEvento").value;
  if (nombreCarrera === "") {
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
    if (nombre === "") {
      Swal.fire({
        title: "Campos incompletos",
        text: "Debe completar todos los campos para continuar",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    } 
    else if(posicion === "") {
      Swal.fire({
        title: "Campos incompletos",
        text: "Debe completar todos los campos para continuar",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    } 
    else if(tiempo === "") {
      Swal.fire({
        title: "Campos incompletos",
        text: "Debe completar todos los campos para continuar",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    } 
    else {
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
    const tablaNadador = document.createElement("tr");
    tablaNadador.innerHTML = `<th>${nadador.posicion}</th> <td class="nadador">${nadador.nombre}</td> <td class="tiempo">${nadador.tiempo}</td>`;
    tablaNadadores.appendChild(tablaNadador);
  });
}

//reiniciarEvento
function reiniciarEvento() {
  listaNadadores.nadadores = []
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
                      <div id="carrito" class="carrito">
                      <header><p>Carrito de compras</p> <button id="cerrarCarritoBTN" class="carritoBTN carritoCerrar"> </header>
                      <div id="bodyCarrito"></div>
                      <footer><div><p>TOTAL CARRITO</p><div id="totalCarrito"></div></div> <button id="vaciarCarrito">Vaciar Carrito</button> <button id="enviarCompra">Enviar Compra</button></footer>
                      </div>`;
  importarProductos();
  let cerrarCarritoBTN = document.getElementById("cerrarCarritoBTN")
  cerrarCarritoBTN.addEventListener("click", () =>{cerrarCarrito()})
  let carritoBTN = document.getElementById("carritoBTN")
  carritoBTN.addEventListener("click", () =>{desplegarCarrito()})
  let enviarCompraBTN = document.getElementById("enviarCompra")
  enviarCompraBTN.addEventListener("click", () =>{enviarCompra()})
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

  // VACIAR CARRITO
  vaciarCarrito()
  function vaciarCarrito(){
    let vaciarCarritoBTN = document.getElementById("vaciarCarrito")
    vaciarCarritoBTN.addEventListener("click", ()=>{
      let carritoVacio = []
      if(carritoListado.carrito = carritoVacio){
        Swal.fire({
          title: 'EL CARRITO YA ESTA VACIO',
          text: '',
          icon: 'info',
          confirmButtonText: 'Aceptar'})
      }
      else{
      Swal.fire({
          title: 'CARRITO VACIADO',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'})
      carritoListado.carrito = []
      carrito = []
      imprimirEnCarrito()
      imprimirTotalCarrito()
      }
    })
  }
  // ENVIAR COMPRA
  function enviarCompra(){
    let totalDeLaCompra = imprimirTotalCarrito()
    let nombreClienteCarrito = definirNombreCliente() 
    let productosCarritoCantidadPrecio = carritoListado.carrito.reduce((acc, prod) => acc + " || " + prod.nombre + " | cantidad :" + prod.cantidad + " | sub total producto :" + prod.subTotal + " || ", "")
    if (productosCarritoCantidadPrecio === ""){
      Swal.fire({
        title: 'NO PUEDES REALIZAR UNA COMPRA VACIA',
        text: 'Debes añadir al menos un producto al carrito.',
        icon: 'error',
        confirmButtonText: 'Aceptar'})
    }
    else{
      ingresarContactoCliente()
      async function ingresarContactoCliente(){
      let { value: contactoCliente } = await Swal.fire({
        title: '¿Como debemos contactarte?',
        input: 'text',
        inputLabel: 'Ingresa tu e-mail o numero de whatsapp',
        inputPlaceholder: 'Ingresa tu nombre',
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        }})
      if (contactoCliente === ""){
        enviarCompra()
      }
      else if ((contactoCliente === undefined)){
        enviarCompra()
      }
      else{
        console.log(`                      - Nombre del cliente: ${nombreClienteCarrito} 
                      - Contacto del cliente: ${contactoCliente}  
                      - Resumen de la compra: ${productosCarritoCantidadPrecio}
                      - Total de la compra: ${totalDeLaCompra}`)
        Swal.fire({
          title: 'COMPRA ENVIADA CON EXITO',
          text: 'Pronto nos pondremos en contacto para coordinar la entrega',
          icon: 'success',
          confirmButtonText: 'Aceptar'})
        carritoListado.carrito = []
        carrito = []
        imprimirEnCarrito()
        imprimirTotalCarrito()
      }}}
  }
}



//Tienda Natacion
function importarProductos() {
  fetch("data/merch.json")
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
                            <div class="descripcionOculta">${producto.descripcion}</div>
                            <div class="contenedorPrecio"><p>AR$</p><h3 class="precioProducto">${productoPrecio}</h3></div>
                            <button class="addCartBTN"> Enviar al carrito</button>`;
  productosImpresos.appendChild(tarjetaProducto)
  mostrarDetalles()
}
//MOSTRAR DETALLES

function mostrarDetalles(){
  const mostrarDetallesButtons = document.querySelectorAll(".imgProducto")
  mostrarDetallesButtons.forEach((mostrarDetallesBTN)=>{mostrarDetallesClick(mostrarDetallesBTN)})
}
function mostrarDetallesClick(mostrarDetallesBTN){
  mostrarDetallesBTN.addEventListener("click", mostrarDetallesClicked)
}
function mostrarDetallesClicked (event){
  let mostrarDetalles = event.target
  let itemADetallar = mostrarDetalles.closest(".tarjetaProducto")
  let itemADetallarNombre = itemADetallar.querySelector(".nombreProducto").textContent
  let itemADetallarImagen = itemADetallar.querySelector(".imagenProducto").src
  let itemADetallarDescripcion = itemADetallar.querySelector(".descripcionOculta").textContent
  Swal.fire({
    title: itemADetallarNombre,
    text: itemADetallarDescripcion,
    imageUrl: itemADetallarImagen,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: itemADetallarNombre,
  })
}
//Carrito

function iniciarCarrito(){
  getCartButton()
  imprimirEnCarrito()
  imprimirTotalCarrito()
}
function getCartButton(){
  const addCartButtons = document.querySelectorAll(".addCartBTN")
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
                                  <button class="eliminarProductoCarrito">X</button>`
    carritoAImprimir.appendChild(productoImpreso)
    getSumarButton()
    getDeleteButton()
    getRestarButton()
    imprimirTotalCarrito()
  })
}
function imprimirTotalCarrito()
{
  let totalCarritoContenedor = document.getElementById("totalCarrito")
  let totalCarritoACobrar = carritoListado.carrito.reduce((acc, prod) => acc + prod.subTotal, 0)
  totalCarritoContenedor.innerText = `AR$ : ${totalCarritoACobrar}`
  return totalCarritoACobrar
}

function getDeleteButton(){
  const deleteButtons = document.querySelectorAll(".eliminarProductoCarrito")
  
  deleteButtons.forEach((deleteButton) => (deleteButtonClick(deleteButton)))
}
function deleteButtonClick(deleteButton){
  deleteButton.addEventListener("click", deleteButtonClicked)
}
function deleteButtonClicked(event){
  let deleteBTN = event.target
  let itemABorrar = deleteBTN.closest(".productoCarrito")
  let productoABorrar = itemABorrar.querySelector(".nombreProductoCarrito").textContent
  carritoListado.buscarBorrarProducto(productoABorrar)
  imprimirEnCarrito()
}

function getSumarButton(){
  const sumarButtons = document.querySelectorAll(".sumarCantidadProducto")
  sumarButtons.forEach((sumarButton) => (sumarButtonClick(sumarButton)))
}
function sumarButtonClick(sumarButton){
  sumarButton.addEventListener("click", sumarButtonClicked)
}
function sumarButtonClicked(event){
  let sumarBTN = event.target
  let itemASumar = sumarBTN.closest(".productoCarrito")
  let productoASumar = itemASumar.querySelector(".nombreProductoCarrito").textContent
  carritoListado.buscarSumarProducto(productoASumar)
  imprimirEnCarrito()
}

function getRestarButton(){
  const restarButtons = document.querySelectorAll(".restarCantidadProducto")
  restarButtons.forEach((restarButton) => (restarButtonClick(restarButton)))
}
function restarButtonClick(restarButton){
  restarButton.addEventListener("click", restarButtonClicked)
}
function restarButtonClicked(event){
  let restarBTN = event.target
  let itemARestar = restarBTN.closest(".productoCarrito")
  let productoARestar = itemARestar.querySelector(".nombreProductoCarrito").textContent
  carritoListado.buscarRestarProducto(productoARestar)
  imprimirEnCarrito()
}