(function() {
    angular.module("app.product").controller('app.product.productController', productController);
    productController.$inject = ['$scope','$location', '$auth', 'app.product.productService'];

    function productController($scope, $location, $auth, productService) {
        $scope.addProduct = function () {
        	productService.addProduct($scope.product);
        }
    }

})();
