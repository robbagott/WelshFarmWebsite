(function () {
    'use strict';

    angular
        .module('admin_horses')
        .config(configureAdminHorsesRoute);

    configureAdminHorsesRoute.$inject = ['$routeProvider'];

    function configureAdminHorsesRoute($routeProvider) {
        $routeProvider
            .when('/admin/horses', {
                templateUrl: '/admin/horses/views/admin_horses.client.view.html'
            })
            .when('/admin/add_horse', {
                templateUrl: '/admin/horses/views/add_horse.client.view.html'
            })
            .when('/admin/edit_horses', {
                templateUrl: '/admin/horses/views/edit_horses.client.view.html'
            })
            .when('/admin/horses/:horseName', {
                templateUrl: '/admin/horses/views/edit_horse.client.view.html'
            });
    }

})();
