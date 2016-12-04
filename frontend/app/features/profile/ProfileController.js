(function() {
    angular.module("app.profile").controller('app.profile.profileController', profileController);
    profileController.$inject = ['$scope', "$uibModal", "toastr", "app.profile.profileService"];

    function profileController($scope, $uibModal, toastr, profileService) {

        $scope.patternPassword = /^[a-zA-Z0-9\s]{6,16}$/;
        $scope.patternEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        $scope.patternPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

        if (localStorage.getItem("user")) {
            $scope.user = JSON.parse(localStorage.getItem("user"));

        } else {
            profileService.getUserInfo().then(function(res) {
                    localStorage.setItem("user", JSON.stringify(res.data[0]));
                    $scope.user = res.data[0];
                })
                .catch(function(error) {
                    toastr.error(error.data, 'Error');
                });
        }

        $scope.updateProfile = function() {
            profileService.update("settings", $scope.user);
        }
        $scope.updatePassword = function() {
            profileService.update("password", $scope.user);
        }

        $scope.open = function() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: './app/features/profile/modal.html',
                controller: 'app.profile.profileController'
            });
        }
    }
})();
