(function() {
    angular.module("app.product").service('app.product.productService', productService);
    productService.$inject = ['$location', '$auth', 'app.apiService'];

    function productService($location, $auth, apiService) {
        this.addProduct = function(product) {
            apiService.post("/product", product).then(function(res) {
                    console.log(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

})();
