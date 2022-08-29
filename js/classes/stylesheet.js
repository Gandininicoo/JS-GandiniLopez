const stylesheet = document.getElementById("stylesheet");
cargarPreferenciaModo();


const botonLM = document.getElementById("botonLM");
botonLM.addEventListener("click", () => {
  lightMode();
});

const botonDM = document.getElementById("botonDM");
botonDM.addEventListener("click", () => {
  darkMode();
});

function lightMode() {
  stylesheet.setAttribute("href", "css/estilos.css");
  let modo = "lightMode";
  guardarPreferenciasModo(modo);
}

function darkMode() {
  stylesheet.setAttribute("href", "css/estilos2.css");
  let modo = "darkMode";
  guardarPreferenciasModo(modo);
}

function guardarPreferenciasModo(modo) {
  if (modo === "darkMode") {
    localStorage.setItem("modo", "darkMode");
  } else {
    localStorage.setItem("modo", "lightMode");
  }
}

function cargarPreferenciaModo() {
  let modoStorage = localStorage.getItem("modo")
  modoStorage === "darkMode" && darkMode();
  modoStorage === "lightMode" && lightMode();
}
