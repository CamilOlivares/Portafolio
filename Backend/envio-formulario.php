<?php
// Incluir archivo de conexión a la base de datos
include 'database.php';  // Asegúrate de que la ruta sea correcta

// Clave secreta de reCAPTCHA (reemplázala con la tuya)
$recaptcha_secret = 'TU_CLAVE_SECRETA';

// Verificar si hay un token de reCAPTCHA en la solicitud
if(isset($_POST['g-recaptcha-response'])) {
    $recaptcha_response = $_POST['g-recaptcha-response'];

    // Enviar el token a la API de Google para validarlo
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $responseKeys = json_decode($response, true);

    // Verificar si la validación fue exitosa
    if ($responseKeys['success']) {
        // Obtener los datos del formulario
        $nombre = $_POST['name'];
        $email = $_POST['email'];
        $mensaje = $_POST['message'];

        // Validar que los datos no estén vacíos
        if (!empty($nombre) && !empty($email) && !empty($mensaje)) {
            // Preparar la consulta SQL para guardar los datos en la base de datos
            $sql = "INSERT INTO mensajes_contacto (nombre, email, mensaje) VALUES (?, ?, ?)";

            // Preparar la sentencia
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                // Vincular los parámetros y ejecutar la consulta
                $stmt->bind_param("sss", $nombre, $email, $mensaje);
                if ($stmt->execute()) {
                    echo "Mensaje enviado correctamente.";
                } else {
                    echo "Error al enviar el mensaje.";
                }
                // Cerrar la sentencia
                $stmt->close();
            } else {
                echo "Error en la preparación de la consulta.";
            }
        } else {
            echo "Por favor, rellena todos los campos.";
        }
    } else {
        echo "Error: reCAPTCHA no validado. Por favor, inténtalo de nuevo.";
    }
} else {
    echo "Error: reCAPTCHA no encontrado.";
}

// Cerrar la conexión
$conn->close();
?>
