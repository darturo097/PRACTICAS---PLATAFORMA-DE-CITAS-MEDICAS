const app = angular.module('app', []);

app.directive('fileModel', ['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      const model = $parse(attrs.fileModel);
      const modelSetter = model.assign;
      element.bind('change', function () {
        scope.$apply(function () {
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);

app.controller('PacienteController', function ($scope) {

  // Datos de ejemplo
  $scope.paciente = {
    nombre: 'Juan Pérez López',
    curp: 'PELJ800101HDFRRN05',
    edad: 45,
    notas: '',
    historial: [
      { fecha: '2024-08-10', descripcion: 'Consulta general - presión alta' },
      { fecha: '2024-09-15', descripcion: 'Revisión de seguimiento' }
    ],
    documentos: [
      { nombre: 'Análisis de sangre', url: 'https://example.com/analisis.pdf' },
      { nombre: 'Radiografía tórax', url: 'https://example.com/radiografia.pdf' }
    ]
  };

  $scope.abrirModal = function () {
    const modal = new bootstrap.Modal(document.getElementById('modalPaciente'));
    modal.show();
  };

  $scope.guardarNotas = function () {
    alert("Notas guardadas:\n" + $scope.paciente.notas);
  };

  $scope.verDocumento = function (url) {
    window.open(url, '_blank');
  };

  $scope.registrarDocumento = function () {
    if (!$scope.nombreDocumento || !$scope.nuevoDocumento) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevo = {
      nombre: $scope.nombreDocumento,
      url: URL.createObjectURL($scope.nuevoDocumento)
    };
    $scope.paciente.documentos.push(nuevo);
    $scope.nombreDocumento = '';
    $scope.nuevoDocumento = null;
    alert("Documento registrado correctamente.");
  };

});