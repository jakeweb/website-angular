(function() {
    angular.module("app", [
        "ngRoute",
        "toastr",
        "satellizer",
        "ui.bootstrap",
        "ngAnimate",
        "ngSanitize",
        "ngMessages",
        "app.register",
        "app.login",
        "app.main",
        "app.profile",
        "app.product"
    ]);
})();
