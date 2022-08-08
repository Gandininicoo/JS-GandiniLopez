const botonLM = document.getElementById("botonLM")
botonLM.addEventListener("click", () => {
  lightMode()
})

const botonDM = document.getElementById("botonDM")
botonDM.addEventListener("click", () => {
  darkMode()
})

function lightMode() {
    stylesheet.setAttribute("href","css/estilos.css")
  }
  
  function darkMode() {
    stylesheet.setAttribute("href","css/estilos2.css")
  }
  