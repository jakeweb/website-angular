(function() {
    angular.module("app.product").controller('app.product.productController', productController);
    productController.$inject = ['$scope', '$location', '$auth', '$rootScope', '$routeParams', 'app.product.productService', "getProducts"];

    function productController($scope, $location, $auth, $rootScope, $routeParams, productService, getProducts) {
        $rootScope.products = getProducts.data;
        $scope.products = $rootScope.products;
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
        $rootScope.itemsPerPage = $scope.itemsPerPage;

        $scope.$watch('itemsPerPage', function(newValue) {
            $rootScope.itemsPerPage = newValue;
        });

        $scope.addProduct = function() {
            productService.addProduct($scope.product);
        }
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        }
        $scope.pageChanged = function() {
            var startItem = Number($scope.itemsPerPage) * ($scope.currentPage - 1);
            productService.getProducts(startItem, $scope.itemsPerPage).then(function(response) {
                    $scope.startItem = response.startItem;
                    $rootScope.products = response.data;
                    $scope.products = $rootScope.products;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

})();
