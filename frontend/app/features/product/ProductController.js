(function() {
    angular.module("app.product").controller('app.product.productController', productController);
    productController.$inject = ['$scope', '$location', '$auth', '$routeParams', 'app.product.productService', "getProducts"];

    function productController($scope, $location, $auth, $routeParams, productService, getProducts) {
        $scope.products = getProducts.data;
        $scope.totalItems = getProducts.count;
        $scope.currentPage = 1;
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
            var startItem;
            if ($scope.currentPage == 1) {
                startItem = 0;
            } else {
                startItem = Number($scope.itemsPerPage) * ($scope.currentPage - 1);
            }
            productService.getProducts(startItem, $scope.itemsPerPage).then(function(response) {
                    $scope.startItem = response.startItem;
                    $scope.products = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

})();
