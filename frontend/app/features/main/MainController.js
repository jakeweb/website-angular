(function() {
    angular.module("app.main").controller('app.main.mainController', mainController);
    mainController.$inject = ['$scope','$location', '$auth', 'app.apiService'];

    function mainController($scope, $location, $auth, apiService) {
        $scope.firstName = localStorage.getItem("firstName");
        $scope.lastName = localStorage.getItem("lastName");
        $scope.email = localStorage.getItem("email");
    }

})();
