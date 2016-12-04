(function() {
    angular.module("app.product").service('app.product.productService', productService);
    productService.$inject = ['$location', '$auth', 'app.apiService'];

    function productService($location, $auth, apiService) {
        this.addProduct = function(product) {
            apiService.post("product", product).then(function(res) {
                    $location.url("/products");
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        this.updateProduct = function(product) {
            apiService.put("product", product).then(function(res) {
                    $location.url("/products");
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        this.deleteProduct = function(product) {
            apiService.post("product", product).then(function(res) {
                    $location.url("/products");
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        
        this.getProducts = function() {
            return apiService.get("products").then(function(res) {
                    return res.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

})();
