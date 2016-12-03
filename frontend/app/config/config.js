(function() {
    angular.module("app").config(["$routeProvider", "$locationProvider", "$authProvider", function($routeProvider, $locationProvider, $authProvider) {
        $locationProvider.html5Mode(true);
        /**
         * Helper auth functions
         */
        var skipIfLoggedIn = ['$q', '$location', '$auth', function($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                $location.path('/');
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }];

        var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
            var deferred = $q.defer();
            if ($auth.isAuthenticated()) {
                deferred.resolve();
            } else {
                $location.path('/login');
            }
            return deferred.promise;
        }];

        $routeProvider
            .when("/", {
                templateUrl: "./app/features/main/main.html",
                controller: "app.main.mainController"
            })
            .when("/login", {
                templateUrl: "./app/features/login/login.html",
                controller: "app.login.loginController",
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })
            .when("/logout", {
                templateUrl: "./app/features/login/login.html",
                controller: "app.logoutController"
            })
            .when("/register", {
                templateUrl: "./app/features/register/register.html",
                controller: "app.register.registerController",
                resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                }
            })
            .when("/settings", {
                templateUrl: "./app/features/settings/settings.html",
                controller: "app.settings.settingsController",
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .otherwise({
                templateUrl: "./app/features/main/main.html"
            });
    }]);
})();
