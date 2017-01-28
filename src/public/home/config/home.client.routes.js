(function () {
    'use strict';

    angular
        .module('home')
        .config(configureHomeRoute);

    configureHomeRoute.$inject = ['$routeProvider'];

    function configureHomeRoute($routeProvider) {
        console.log('Configured home route');
        $routeProvider.when('/home', {
            templateUrl: 'home/views/home.client.view.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
    }
})();
