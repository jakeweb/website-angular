(function() {
    angular.module("app.profile").service('app.profile.profileService', profileService);
    profileService.$inject = ['$location', "toastr", 'app.apiService'];

    function profileService($location, toastr, apiService) {
        this.getUserInfo = function() {
            return apiService.get("profile");
        }
        this.update = function(url, user) {
            apiService.put(url, user).then(function(res) {
                    if (url == "settings") {
                        localStorage.setItem("user", JSON.stringify(user));
                        $location.url("/profile");
                        toastr.success('Profile data updated');
                    }
                    // updated password
                    else {
                        toastr.success('Password updated');
                    }
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
                });
        }
    }
})();
