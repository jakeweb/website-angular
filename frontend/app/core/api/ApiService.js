(function() {
    angular.module("app")
        // .constant("baseUrl", "/api/")
        .service("app.apiService", apiService);

    function apiService($http) {

        this.get = function(url, index) {
            console.log('apiService.get:', url);
            return $http({
                method: 'GET',
                url: baseUrl + url + '/',
                params: {
                    index: index
                }
            });
        }
        this.post = function(url, data, config) {
            console.log('apiService.post:', url, data);
            if (typeof config !== "undefined") {
                var fd = new FormData();
                for (var key in data) {
                    fd.append(key, data[key]);
                }
                return $http.post(url + '/', fd, {
                    transformRequest: angular.indentity,
                    headers: {
                        'Content-Type': undefined
                    }
                });
            } else {
                return $http.post(url + '/', data);
            }
        }
        this.put = function(url, data) {
            console.log('apiService.put:', url);
            return $http.put(url + '/', data);
        }
        this.delete = function(url) {
            console.log('apiService.delete:', url);
            return $http.delete(url + '/');
        }
    }

    apiService.$inject = ["$http"];
})();
