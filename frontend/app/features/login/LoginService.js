(function() {
    angular.module("app.login").service('app.login.loginService', loginService);
    loginService.$inject = ['$location', '$auth', 'app.apiService'];

    function loginService($location, $auth, apiService) {
        this.login = function(user) {
            $auth.login(user)
                .then(function(res) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    $location.path('/');
                })
                .catch(function(error) {

                });
        }
    }

})();
