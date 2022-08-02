const nadadores = [
];
const listaNadadores = new ListaNadadores(nadadores)
const headDocument = document.getElementById("headDocument")
const CrearCarreraBTN = document.getElementById("botonCC")

function showMenu() {
  const menuCompetidores = document.getElementById("menuCompetidores")
  menuCompetidores.innerHTML = `<div class="barraBotones">
                                <button class="boton" id="botonAC">Agregar Competidor</button>
                                <button class="boton" id="botonBC">Borrar Competidor</button>
                                </div>`

  const botonAC = document.getElementById("botonAC")
  botonAC.addEventListener("click", () => {
    crearNadador();
  })
  const botonBC = document.getElementById("botonBC")
  botonBC.addEventListener("click", () => {
    borrarNadador();
  })
}

const botonLM = document.getElementById("botonLM")
botonLM.addEventListener("click", () => {
  lightMode()
})

const botonDM = document.getElementById("botonDM")
botonDM.addEventListener("click", () => {
  darkMode()
})

function listarNadadores() {
  const tablaNadadores = document.getElementById("tabla")
  tablaNadadores.innerHTML = ""
  listaNadadores.nadadores.forEach((nadador) => {
    const tablaNadador = document.createElement("table")
    tablaNadador.innerHTML = `<tr><th>${nadador.posicion}</th> <td class="nadador">${nadador.nombre}</td> <td class="tiempo">${nadador.tiempo}</td>`
    tablaNadadores.appendChild(tablaNadador);
  })
  console.log(nadadores)
}

function borrarNadador() {
  let nadadorABorrar = prompt("Ingrese el nombre del competidor a borrar")
  listaNadadores.buscar(nadadorABorrar)
  listarNadadores()
}


function crearNadador() {
  let nombre = prompt(`Ingrese nombre del competidor`);
  if (nombre === null) {
    alert("Opcion no válida")
  }
  else if (nombre === ""){
    alert("Ingrese una nombre valido")
  }
  else {
    let posicion = prompt(`Ingrese la posicion de ${nombre}`);
    let tiempo = prompt(`Ingrese el tiempo de ${nombre}`);
    let nadador = new Nadador(listaNadadores.darCantidad() + 1, nombre, posicion, tiempo);
    listaNadadores.agregarNadador(nadador)
    listarNadadores()
  }
}



function lightMode() {
  stylesheet.innerHTML = `<link rel="stylesheet" href="sass/estilos.css" id="stylesheet">`
}

function darkMode() {
  stylesheet.innerHTML = `<link rel="stylesheet" href="sass/estilos2.css" id="stylesheet">`
}


botonCC.addEventListener("click", () => {
  crearCarrera()
})
function crearCarrera() {
  const nombreCarrera = prompt("Ingrese nombre del evento")
  if (nombreCarrera === null) {
    alert("Opcion no válida")
  }
  else if (nombreCarrera === ""){
    alert("Ingrese una nombre valido")
  }
  else {
    const Carrera = document.getElementById(`Carrera`)
    Carrera.innerHTML = `<div class="carrera"><p> Evento "${nombreCarrera}" </p></div>`
    showMenu();
  }
}
