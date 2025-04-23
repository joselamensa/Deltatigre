<?php
// Asegurarse de que no haya salida antes de las cabeceras
ob_start();

// Configuración de cabeceras para permitir solicitudes AJAX
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Función para devolver una respuesta JSON
function sendJsonResponse($status, $message) {
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

// Verificar si es una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Validar y limpiar los datos de entrada
        $nombre = isset($_POST["nombre"]) ? htmlspecialchars(trim($_POST["nombre"])) : '';
        $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
        $mensaje = isset($_POST["mensaje"]) ? htmlspecialchars(trim($_POST["mensaje"])) : '';
        
        // Validar que los campos requeridos no estén vacíos
        if (empty($nombre) || empty($email) || empty($mensaje)) {
            sendJsonResponse('error', 'Todos los campos son obligatorios');
        }
        
        // Validar formato de email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            sendJsonResponse('error', 'El formato del email no es válido');
        }
        
        // Configurar el destinatario y el asunto
        $destinatario = "hola@deltaoculto.com";
        $asunto = "Nuevo mensaje de contacto - Delta Oculto";
        
        // Construir el contenido del correo
        $contenido = "Nombre: $nombre\n";
        $contenido .= "Email: $email\n";
        $contenido .= "Mensaje:\n$mensaje\n";
        
        // Configurar las cabeceras del correo
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        
        // Intentar enviar el correo
        $enviado = mail($destinatario, $asunto, $contenido, $headers);
        
        if ($enviado) {
            sendJsonResponse('success', 'Mensaje enviado correctamente');
        } else {
            sendJsonResponse('error', 'Error al enviar el mensaje');
        }
    } catch (Exception $e) {
        // Capturar cualquier excepción y devolver un error
        sendJsonResponse('error', 'Error interno del servidor: ' . $e->getMessage());
    }
} else {
    // Si no es una solicitud POST, devolver un error
    sendJsonResponse('error', 'Método no permitido');
}
?>
