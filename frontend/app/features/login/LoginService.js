(function() {
    angular.module("app.login").service('app.login.loginService', loginService);
    loginService.$inject = ['$location', '$auth','toastr', 'app.apiService'];

    function loginService($location, $auth, toastr, apiService) {
        this.login = function(user) {
            $auth.login(user)
                .then(function(res) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    $location.path('/');
                    toastr.success('Welcome!', 'You have been successfully signed in');
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
                });
        }
    }

})();
