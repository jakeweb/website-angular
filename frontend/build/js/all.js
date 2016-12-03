(function() {
    angular.module("app", [
        "ngRoute",
        "satellizer",
        "app.register",
        "app.login",
        "app.main",
        "app.profile"
    ]);
})();
