angular.module('app').controller('app.navbarController', navbarController);
navbarController.inject = ["$scope", "$auth"];

function navbarController($scope, $auth) {
    $scope.isAuthenticated = function() {
    	// console.log($auth.isAuthenticated());
        return $auth.isAuthenticated();
    };
}
