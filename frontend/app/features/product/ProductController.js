(function() {
    angular.module("app.product").controller('app.product.productController', productController);
    productController.$inject = ['$scope', '$location', '$auth', '$routeParams', 'app.product.productService', "getProducts"];

    function productController($scope, $location, $auth, $routeParams, productService, getProducts) {
        $scope.addProduct = function() {
            productService.addProduct($scope.product);
        }
        $scope.products = getProducts;
    }

})();
