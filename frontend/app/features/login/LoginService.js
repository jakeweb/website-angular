(function() {
    angular.module("app.login").service('app.login.loginService', loginService);
    loginService.$inject = ['$location', '$auth', 'toastr'];

    function loginService($location, $auth, toastr) {
        this.login = function(user) {
            $auth.login(user)
                .then(function(res) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    $location.path('/');
                    toastr.success('Welcome to the site!');
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
                });
        }
    }

})();
