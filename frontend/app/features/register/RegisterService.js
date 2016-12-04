(function() {
    angular.module("app.register").service('app.register.registerService', registerService);
    registerService.$inject = ['$location', 'toastr', 'app.apiService'];

    function registerService($location, toastr, apiService) {
        this.signup = function(user) {
            apiService.post("auth/signup", user).then(function() {
                $location.url("/login");
                toastr.success('Lets sign in!', 'Account successfully created!');
            }).catch(function(error) {
                toastr.error(error.data, 'Error');
            })
        }
    }

})();
