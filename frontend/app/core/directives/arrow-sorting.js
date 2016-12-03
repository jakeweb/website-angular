(function() {
    angular.module("app")
        .directive('arrowSorting', function() {
            return {
                restrict: 'E',
                templateUrl: './app/core/directives/arrow-sorting.html'
            }
        })
})();
