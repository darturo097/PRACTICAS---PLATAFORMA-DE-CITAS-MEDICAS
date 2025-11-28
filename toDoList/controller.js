angular.module('ToDoList', [])
.controller('FirstController', function($scope, $http) {

    if (localStorage.getItem("angular-todolist")) {
        $scope.todo = JSON.parse(localStorage.getItem("angular-todolist"));
    } else {
        $scope.todo = [];
    }

    $scope.addAct = function() {
        $scope.todo.push($scope.newAct);
        $scope.newAct = {};
        localStorage.setItem("angular-todolist", JSON.stringify($scope.todo));
    };

    $scope.limpiar = function() {
        $scope.todo = [];
        localStorage.removeItem("angular-todolist");
    }

    $scope.eliminar = function(index) {
        $scope.todo.splice(index, 1);
        localStorage.setItem("angular-todolist", JSON.stringify($scope.todo));
    }
});
