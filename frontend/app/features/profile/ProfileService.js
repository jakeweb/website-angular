(function() {
    angular.module("app.profile").service('app.profile.profileService', profileService);
    profileService.$inject = ['$location', '$auth', 'app.apiService'];

    function profileService($location, $auth, apiService) {
        this.getUserInfo = function() {
            return apiService.get("profile");
        }
        this.update = function(url, user) {
            apiService.put(url, user).then(function(res) {
                    if (url == "settings") {
                        localStorage.setItem("user", JSON.stringify(user));
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
})();
