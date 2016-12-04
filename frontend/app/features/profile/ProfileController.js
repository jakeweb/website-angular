(function() {
    angular.module("app.profile").controller('app.profile.profileController', profileController);
    profileController.$inject = ['$scope', '$location', '$auth', "app.profile.profileService"];

    function profileController($scope, $location, $auth, profileService) {

        if (localStorage.getItem("user")) {
            $scope.user = JSON.parse(localStorage.getItem("user"));

        } else {
            profileService.getUserInfo().then(function(res) {
                    localStorage.setItem("user", JSON.stringify(res.data[0]));
                    $scope.user = res.data[0];
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        $scope.patternPassword = /^[a-zA-Z0-9\s]{6,16}$/;
        $scope.patternEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        $scope.patternPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

        $scope.update = function() {
            profileService.update($scope.user);
        }
    }

})();
