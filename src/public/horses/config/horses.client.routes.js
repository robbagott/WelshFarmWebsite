(function () {
    'use strict';

    angular
        .module('home')
        .config(configureHorsesRoute);

    configureHorsesRoute.$inject = ['$routeProvider'];

    function configureHorsesRoute($routeProvider) {
        console.log("Configured horses route");

        $routeProvider.when('/horses', {
            templateUrl: 'horses/views/horses.client.view.html'
        });
    }
})();
