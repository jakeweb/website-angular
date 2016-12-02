(function() {
    angular.module('app.register').controller('app.register.registerController', registerController);
    registerController.$inject = ['$scope', 'app.register.registerService'];

    function registerController($scope, registerService) {
        $scope.patternPassword = /^[a-zA-Z0-9\s]{6,16}$/;
        $scope.patternEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    	
    	$scope.signup = function () {
    		registerService.signup($scope.user);
    	}
    };
})();
