(function() {
    angular.module("app.profile").controller('app.profile.profileController', profileController);
    profileController.$inject = ['$scope', '$location', '$auth', "app.profile.profileService"];

    function profileController($scope, $location, $auth, profileService) {

        $scope.user = {
        	firstName: localStorage.getItem("firstName"),
        	lastName: localStorage.getItem("lastName"),
        	email: localStorage.getItem("email"),
        	phone: localStorage.getItem("phone")
        }

        $scope.patternPassword = /^[a-zA-Z0-9\s]{6,16}$/;
        $scope.patternEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    	$scope.patternPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    	$scope.update = function () {
    		profileService.update($scope.user);
    	}
    }

})();
