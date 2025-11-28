// app.js
var app = angular.module('app', []);

app.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',                          // Permite URLs del mismo origen
        'data:**'                        // ← ¡Permite TODAS las data: URLs!
    ]);
});

app.controller('FileController', function ($scope, $http, $sce) {
    $scope.base64 = null;
    $scope.archivos = [];

    // Cargar archivos al iniciar
    $scope.cargarArchivos = function () {
        $http.get('api/obtenerArchivos.php')
            .then(function (response) {
                $scope.archivos = response.data;
            }, function (error) {
                alert('Error al cargar archivos');
            });
    };

    // Convertir archivo a Base64
    $scope.convertirBase64 = function (files) {
        if (!files || files.length === 0) return;

        var file = files[0];
        var maxMB = 10;

        if (file.size > maxMB * 1024 * 1024) {
            alert("Imagen muy grande: " + (file.size / 1024 / 1024).toFixed(1) + " MB");
            return;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            var base64 = e.target.result;
            var sizeMB = (base64.length * 0.75 / 1024 / 1024).toFixed(2);
            var esPDF = base64.startsWith('data:application/pdf');

            $scope.$apply(function () {
                $scope.base64 = base64;
                $scope.nombreArchivo = file.name;
                $scope.tamanio = sizeMB + " MB";
                $scope.esPDF = esPDF;

                // Confiar en la URL para ng-src
                $scope.base64Seguro = $sce.trustAsResourceUrl(base64);
            });
        };
        reader.readAsDataURL(file);
    };

    // Subir archivo al servidor
    $scope.subirArchivo = function () {
        if (!$scope.base64) return;

        var data = {
            nombre: $scope.nombreArchivo,
            base64: $scope.base64
        };

        $http.post('api/subirArchivo.php', data)
            .then(function (response) {
                if (!response.data.error) {
                    alert('Archivo subido con éxito');
                    $scope.base64 = null;
                    document.getElementById('fileInput').value = '';
                    $scope.cargarArchivos();
                } else {
                    alert('Error: ' + response.data.message);
                }
            }, function (error) {
                alert('Error de conexión');
            });
    };

    // Visualizar imagen en nueva pestaña
    $scope.abrirImagen = function (archivo) {
        var win = window.open('');
        win.document.write(`
            <!DOCTYPE html>
            <html>
            <head><title>${archivo.nombre}</title></head>
            <body style="margin:0; text-align:center; background:#f0f0f0;">
                <img src="${archivo.base64}" style="max-width:100%; max-height:100vh;" />
                <p><strong>${archivo.nombre}</strong></p>
            </body>
            </html>
        `);
    };

    $scope.abrirArchivo = function (archivo) {
        var win = window.open('');
        if (archivo.base64.startsWith('data:application/pdf')) {
            // Es PDF → incrustar con <embed>
            win.document.write(`
            <!DOCTYPE html>
            <html>
            <head><title>${archivo.nombre}</title></head>
            <body style="margin:0;">
                <embed src="${archivo.base64}" type="application/pdf" width="100%" height="100vh" />
                <p style="text-align:center; padding:10px;">
                    <a href="$$ {archivo.base64}" download=" $${archivo.nombre}">Descargar PDF</a>
                </p>
            </body>
            </html>
        `);
        } else {
            // Es imagen
            win.document.write(`
            <!DOCTYPE html>
            <html>
            <head><title>${archivo.nombre}</title></head>
            <body style="margin:0; text-align:center; background:#f0f0f0;">
                <img src="${archivo.base64}" style="max-width:100%; max-height:100vh;" />
            </body>
            </html>
        `);
        }
    };

    // Descargar archivo
    $scope.descargarArchivo = function (archivo) {
        var link = document.createElement('a');
        link.href = archivo.base64;
        link.download = archivo.nombre;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };



    // Cargar archivos al inicio
    $scope.cargarArchivos();
});