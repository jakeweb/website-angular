(function() {
    angular.module('app.login').controller('app.login.loginController', loginController);
    loginController.$inject = ['$scope', '$auth', 'app.login.loginService'];

    function loginController($scope, $auth, loginService) {

        $scope.patternPassword = /^[a-zA-Z0-9\s]{6,16}$/;
        $scope.patternEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

        $scope.login = function() {
            if ($scope.remember) {
                $auth.setStorageType('localStorage');
            } else {
                $auth.setStorageType('sessionStorage');
            }
            loginService.login($scope.user);
        }
    };
})();
