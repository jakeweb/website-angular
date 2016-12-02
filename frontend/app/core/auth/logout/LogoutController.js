angular.module('app').controller('app.logoutController', logoutController);
logoutController.inject = ['$location', '$auth'];

function logoutController($location, $auth) {
    if (!$auth.isAuthenticated()) {
        return;
    }
    $auth.logout().then(function() {
    	localStorage.clear();
        $location.path('/login');
    });
};
