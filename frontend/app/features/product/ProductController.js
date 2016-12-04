(function() {
    angular.module("app.product").controller('app.product.productController', productController);
    productController.$inject = ['$scope', '$rootScope', '$routeParams','toastr', 'app.product.productService', "getProducts"];

    function productController($scope, $rootScope, $routeParams, toastr, productService, getProducts) {
        $scope.patternPrice = /^[0-9]+(\.[0-9]{1,2})?$/;
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
                    $scope.totalItems = response.count;
                    $rootScope.products = response.data;
                    $scope.products = $rootScope.products;
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
                });
        }
        $scope.deleteProducts = function() {
            var startItem = Number($scope.itemsPerPage) * ($scope.currentPage - 1);
            productService.deleteProducts(startItem, $scope.itemsPerPage, $scope.products).then(function(response) {
                    $scope.totalItems = response.count;
                    $rootScope.products = response.data;
                    $scope.products = $rootScope.products;
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
                });
        }
    }

})();
