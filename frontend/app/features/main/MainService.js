(function() {
    angular.module("app.main").service('app.main.mainService', mainService);
    mainService.$inject = ['$location', '$auth', 'app.apiService'];

    function mainService($location, $auth, apiService) {

    }

})();
