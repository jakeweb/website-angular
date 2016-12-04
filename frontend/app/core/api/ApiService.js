(function() {
    angular.module("app")
        .constant("baseUrl", "/api/")
        .service("app.apiService", apiService);

    function apiService($http, baseUrl) {
        this.get = function(url, obj) {
            // console.log('apiService.get:', obj);
            return $http({
                method: 'GET',
                url: baseUrl + url + '/',
                params: {
                    startItem: obj.startItem,
                    itemsPerPage: obj.itemsPerPage
                }
            });
        }
        this.post = function(url, data, config) {
            // console.log('apiService.post:', url, data);
            return $http.post(baseUrl + url + '/', data);
        }
        this.put = function(url, data) {
            // console.log('apiService.put:', url);
            return $http.put(baseUrl + url + '/', data);
        }
        this.delete = function(url, obj) {
            // console.log('apiService.delete:', url);
            return $http({
                method: 'DELETE',
                url: baseUrl + url + '/',
                params: {
                    startItem: obj.startItem,
                    itemsPerPage: obj.itemsPerPage,
                    products: obj.list
                }
            });
        }
    }
    apiService.$inject = ["$http", "baseUrl"];
})();
