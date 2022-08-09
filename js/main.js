let nadadores = [];
const listaNadadores = new ListaNadadores(nadadores);
const headDocument = document.getElementById("headDocument");
const CrearCarreraBTN = document.getElementById("botonCC");
const printButton = document.getElementById("printButton")

//imprimir
printButton.addEventListener("click",() => {
  window.print()
})
//crear evento
botonCC.addEventListener("click", () => {
  crearCarrera();
});
function crearCarrera() {
  const nombreCarrera = document.getElementById("nombreEvento").value;
  if (nombreCarrera === null) {
    alert("Opcion no válida");
  } else if (nombreCarrera === "") {
    alert("Ingrese una nombre valido");
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
      alert("Opcion no válida");
    } else if (nombre === "") {
      alert("Ingrese una nombre valido");
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
    tablaNadador.innerHTML = `<tr><th>${nadador.posicion}</th> <td class="nadador">${nadador.nombre}</td> <td class="tiempo">${nadador.tiempo}</td>`;
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
  tablaNadadores.innerHTML = ""
}

