<?php
require "conexion.php";
header('Content-Type: application/json');

// Leer JSON grande
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(["error" => true, "message" => "JSON inválido: " . json_last_error_msg()]);
    exit();
}

if (empty($input['nombre']) || empty($input['base64'])) {
    echo json_encode(["error" => true, "message" => "Faltan datos"]);
    exit();
}

$nombre = $input['nombre'];
$base64 = $input['base64'];

// Validar que sea imagen Base64
if (!preg_match('#^data:[a-z\/]+;base64,#i', $base64)) {
    echo json_encode(["error" => true, "message" => "Formato Base64 inválido"]);
    exit();
}

// Opcional: límite de 10 MB
$size = strlen($base64) * 0.75; // tamaño real en bytes
if ($size > 10 * 1024 * 1024) {
    echo json_encode(["error" => true, "message" => "Imagen demasiado grande (>10 MB)"]);
    exit();
}

$stmt = $conexion->prepare("INSERT INTO archivos (nombre, base64) VALUES (?, ?)");
$stmt->bind_param("ss", $nombre, $base64);

if ($stmt->execute()) {
    echo json_encode([
        "error" => false,
        "message" => "¡Guardado!",
        "id" => $stmt->insert_id,
        "tamaño_mb" => round($size / 1024 / 1024, 2)
    ]);
} else {
    echo json_encode(["error" => true, "message" => "Error MySQL: " . $stmt->error]);
}

$stmt->close();
$conexion->close();
?>