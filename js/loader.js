// loader.js

window.addEventListener("load", function() {
  // Mantener el loader visible durante 2 segundos
  setTimeout(function() {
    document.getElementById("loader").style.display = "none"; // Oculta el loader
    document.getElementById("main-content").style.display = "block"; // Muestra el contenido principal
  }, 2000); // 2000 milisegundos = 2 segundos
});
