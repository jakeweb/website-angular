(function() {
    angular.module("app.product").controller('app.product.productController', productController);
    productController.$inject = ['$scope', '$location', '$auth', '$routeParams', 'app.product.productService', "getProducts"];

    function productController($scope, $location, $auth, $routeParams, productService, getProducts) {
        $scope.products = getProducts;
        $scope.totalItems = 64;
        $scope.currentPage = 4;
        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;

        $scope.count = {
            sm: "10",
            md: "20",
            lg: "50"
        }
        $scope.itemsPerPage = $scope.count.sm;

        $scope.addProduct = function() {
            productService.addProduct($scope.product);
        }
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        }
        $scope.pageChanged = function() {
            console.log('Page changed');
        }
    }

})();
