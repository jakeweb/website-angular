(function() {
    angular.module("app").config(["$routeProvider", "$locationProvider", "$authProvider", function($routeProvider, $locationProvider, $authProvider) {
        $locationProvider.html5Mode(true);
        // starting values for pagination
        var startItem = 0;
        var itemsPerPage = 10;
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
            .when("/profile", {
                templateUrl: "./app/features/profile/profile.html",
                controller: "app.profile.profileController",
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when("/settings", {
                templateUrl: "./app/features/profile/settings.html",
                controller: "app.profile.profileController",
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when("/products", {
                templateUrl: "./app/features/product/productsList.html",
                controller: "app.product.productController",
                resolve: {
                    loginRequired: loginRequired,
                    getProducts: ["app.product.productService", function(productService) {
                        return productService.getProducts(startItem, itemsPerPage);
                    }]
                }
            })
            .when("/product/add", {
                templateUrl: "./app/features/product/product.html",
                controller: "app.product.productController",
                resolve: {
                    loginRequired: loginRequired,
                    getProducts: ["app.product.productService", function(productService) {
                        return productService.getProducts(startItem, itemsPerPage);
                    }]
                }
            })
            .when("/product/edit/:id", {
                templateUrl: "./app/features/product/editProduct.html",
                controller: "app.product.editProductController",
                resolve: {
                    loginRequired: loginRequired,
                    getProducts: ["app.product.productService", function(productService) {
                        return productService.getProducts(startItem, itemsPerPage);
                    }]
                }
            })
            .otherwise({
                templateUrl: "./app/core/404/404.html"
            });
    }]);
})();
