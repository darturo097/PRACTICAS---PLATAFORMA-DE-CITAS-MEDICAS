<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require __DIR__ . "/PHPMailer/src/PHPMailer.php";
require __DIR__ . "/PHPMailer/src/SMTP.php";
require __DIR__ . "/PHPMailer/src/Exception.php";

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = json_decode(file_get_contents("php://input"), true);

$para = $data["email"];
$asunto = $data["asunto"];
$mensaje = $data["mensaje"];

$mail = new PHPMailer(true);

try {
    // Configurar SMTP
    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "diego.arteaga.097@gmail.com"; 
    $mail->Password = 
    $mail->SMTPSecure = "tls";
    $mail->Port = 587;

    // Remitente
    $mail->setFrom("tu_correo@gmail.com");

    // Destinatario
    $mail->addAddress($para);

    // Contenido
    $mail->isHTML(true);
    $mail->Subject = $asunto;
    $mail->Body = $mensaje;

    $mail->send();

    echo json_encode(["ok" => true]);
} catch (Exception $e) {
    echo json_encode(["ok" => false, "error" => $mail->ErrorInfo]);
}
