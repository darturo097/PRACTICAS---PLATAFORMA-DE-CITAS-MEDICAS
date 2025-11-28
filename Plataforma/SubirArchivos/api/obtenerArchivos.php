<?php
header("Content-Type: application/json");
require "conexion.php";

$result = $conexion->query("SELECT * FROM archivos ORDER BY id DESC");

$archivos = [];

while ($fila = $result->fetch_assoc()) {
    $archivos[] = $fila;
}

echo json_encode($archivos);
?>