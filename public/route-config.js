(function() {
    angular
        .module('chatApp')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'index.html'
            })
    }

})();