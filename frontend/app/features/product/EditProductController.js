(function() {
    angular.module("app.product").controller('app.product.editProductController', editProductController);
    editProductController.$inject = ['$scope', '$location', '$auth', '$routeParams', 'app.product.productService', "getProducts"];

    function editProductController($scope, $location, $auth, $routeParams, productService, getProducts) {
        $scope.updateProduct = function() {
            productService.updateProduct($scope.product);
        }
        $scope.products = getProducts;
        $scope.product = $scope.products[Number($routeParams.id - 1)];
        console.log(Number($routeParams.id) - 1);
        console.log($scope.products);
    }

})();
