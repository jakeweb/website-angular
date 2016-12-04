(function() {
    angular.module("app.product").controller('app.product.editProductController', editProductController);
    editProductController.$inject = ['$scope', '$rootScope', '$routeParams', 'toastr', 'app.product.productService'];

    function editProductController($scope, $rootScope, $routeParams, toastr, productService) {
        $scope.patternPrice = /^[0-9]+(\.[0-9]{1,2})?$/;

        var currentProduct = Number($routeParams.id) - 1;
        var itemsPerPage = null;

        if ($rootScope.products) {

            itemsPerPage = $rootScope.itemsPerPage;
            $scope.products = $rootScope.products;
            if (currentProduct >= itemsPerPage) {
                currentProduct = currentProduct % itemsPerPage;
            }
            $scope.product = $scope.products[currentProduct];

            console.log(currentProduct);
            console.log($rootScope.itemsPerPage);

        } else {
            itemsPerPage = 10; //by default
            var pseudoCurrentPage = Number($routeParams.id) / itemsPerPage;
            var startItem = itemsPerPage * (parseInt(pseudoCurrentPage));
            currentProduct = currentProduct % itemsPerPage;

            productService.getProducts(startItem, itemsPerPage).then(function(response) {
                    $rootScope.products = response.data;
                    $scope.products = $rootScope.products;
                    $scope.product = $scope.products[currentProduct];
                    console.log(currentProduct);
                    console.log(typeof $scope.product.price);
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
                });
        }


        $scope.updateProduct = function() {
            productService.updateProduct($scope.product);
        }
    }
})();
