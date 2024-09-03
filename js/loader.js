// loader.js

window.addEventListener("load", function() {
  // Mantener el loader visible durante 1 segundos
  setTimeout(function() {
    document.getElementById("loader").style.display = "none"; // Oculta el loader
    document.getElementById("main-content").style.display = "block"; // Muestra el contenido principal
  }, 1000); // 1000 milisegundos = 1 segundos
});
