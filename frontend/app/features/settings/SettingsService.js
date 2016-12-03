(function() {
    angular.module("app.settings").service('app.settings.settingsService', settingsService);
    settingsService.$inject = ['$location', '$auth', 'app.apiService'];

    function settingsService($location, $auth, apiService) {
        this.update = function(user) {
            console.log(user);
            apiService.put("/settings", user).then(function(res) {
                    console.log(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

    }

})();
