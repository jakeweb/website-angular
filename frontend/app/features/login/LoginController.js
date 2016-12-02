(function() {
    angular.module('app.login').controller('app.login.loginController', loginController);
    loginController.$inject = ['$scope', 'app.login.loginService'];
    function loginController($scope, loginService) {
        $scope.login = function () {
        	loginService.login($scope.user);
        }
    };
})();
