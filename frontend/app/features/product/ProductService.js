(function() {
    angular.module("app.product").service('app.product.productService', productService);
    productService.$inject = ['$location', 'toastr', 'app.apiService'];

    function productService($location, toastr, apiService) {
        this.addProduct = function(product) {
            apiService.post("product", product).then(function(res) {
                    $location.url("/products");
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
                });
        }
        this.updateProduct = function(product) {
            apiService.put("product", product).then(function(res) {
                    $location.url("/products");
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
                });
        }
        this.getProducts = function(startItem, itemsPerPage) {
            return apiService.get("products", { startItem, itemsPerPage }).then(function(res) {
                    return res.data;
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
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
                    toastr.error(error.data, 'Error');
                });
        }
    }

})();
