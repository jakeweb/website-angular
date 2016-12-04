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

        this.getProducts = function(startItem, itemsPerPage) {
            return apiService.get("products", { startItem, itemsPerPage }).then(function(res) {
                    return res.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        this.deleteProducts = function(startItem, itemsPerPage, products) {
            var list = [];
            angular.forEach(products, function(value, key) {
                if (value.selected) {
                    list.push(value.id);
                }
            });
            var obj = {
                startItem: startItem,
                itemsPerPage: itemsPerPage,
                list: list
            }
            return apiService.delete("products", obj).then(function(res) {
                    return res.data;
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

})();
