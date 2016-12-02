(function() {
    angular.module('app.login').controller('app.login.loginController', loginController);
    loginController.$inject = ['$scope'];
    function loginController($scope) {
        console.log('loginController');
    };
})();
