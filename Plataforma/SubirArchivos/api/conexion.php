<?php
$conexion = new mysqli("localhost", "root", "", "archivos");

if ($conexion->connect_errno) {
    echo json_encode(["error" => true, "message" => "Error de conexión"]);
    exit();
}

$conexion->set_charset("utf8");
?>