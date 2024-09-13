<?php
// Configuración para la conexión a la base de datos
$server = "localhost"; 
$username = "root"; //Es un usuario con privilegios elevados en un sistema, en este caso para el ejercicio.
$password = "Emi290715"; // Se deja en blanco si no hay contraseña
$database = "portafolio"; //Nombre de la Base de Datos

// Crear conexión
$conn = new mysqli($host, $user, $password, $database); //$conn Genera la Conezio o consulta a la Base de Datos pero 
//no maneja posibles errores de conexión. Se recomienda agregar manejo de errores para gestionar posibles problemas durante la conexión.
//A continuación una forma de plantear la conexión.

//-------------------------------------------------------------------------------------------------------------------
//Se puede Plantear la conexión con la siguiente Condicional para manejar los errores

// Crear una nueva instancia de la clase mysqli para establecer la conexión a la base de datos
$conn = new mysqli($host, $user, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    // Si hay un error de conexión, imprimir un mensaje de error y terminar la ejecución del script
    die("Error de conexión: " . $conn->connect_error);
}
// El bloque de código hasta aquí garantiza que la conexión se ha establecido correctamente

// A partir de este punto, puedes realizar operaciones en la base de datos utilizando el objeto $conn

// ...

// Cerrar la conexión cuando hayas terminado de trabajar con la base de datos
$conn->close();
?>