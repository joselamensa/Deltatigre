<?php
// Configuración de cabeceras para permitir solicitudes AJAX
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verificar si es una solicitud POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar y limpiar los datos de entrada
    $nombre = isset($_POST["nombre"]) ? htmlspecialchars(trim($_POST["nombre"])) : '';
    $email = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : '';
    $mensaje = isset($_POST["mensaje"]) ? htmlspecialchars(trim($_POST["mensaje"])) : '';
    
    // Validar que los campos requeridos no estén vacíos
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios']);
        exit;
    }
    
    // Validar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'El formato del email no es válido']);
        exit;
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
        echo json_encode(['status' => 'success', 'message' => 'Mensaje enviado correctamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al enviar el mensaje']);
    }
} else {
    // Si no es una solicitud POST, redirigir a la página principal
    header("Location: index.html");
    exit;
}
?>
