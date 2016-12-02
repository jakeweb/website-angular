(function() {
    angular.module("app.register").service('app.register.registerService', registerService);
    registerService.$inject = ['$location', 'app.apiService'];

    function registerService($location, apiService) {
        this.signup = function(user) {
        	apiService.post("auth/signup", user).then(function () {
        		$location.url("/login");
        	}).catch(function (error) {
        		console.log(error);
        	})
        }
    }

})();
