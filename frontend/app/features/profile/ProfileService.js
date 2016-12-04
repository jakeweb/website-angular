(function() {
    angular.module("app.profile").service('app.profile.profileService', profileService);
    profileService.$inject = ['$location', '$auth', 'app.apiService'];

    function profileService($location, $auth, apiService) {
        this.getUserInfo = function() {
            return apiService.get("profile");
        }
        this.update = function(user) {
            apiService.put("settings", user).then(function(res) {
                    console.log(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
})();
