var app = angular.module('app', []);

app.controller('Controller', function ($scope, $http) {

    $scope.enviarRecordatorio = function () {
        fetch("api.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "diego.arteaga.097@gmail.com",
                asunto: "Recordatorio de Cita",
                mensaje: "Hola, recuerda tu cita mañana a las 10 AM."
            })
        })
        .then(r => r.json())
        .then(data => console.log(data));
    }

    $scope.enviarRecordatorio(); // <- aquí faltaba $scope
});