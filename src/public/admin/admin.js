(function () {
    'use strict';

    angular
        .module('admin', ['ngRoute', 'ngResource', 'shared_services', 'login', 'admin_horses'])
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.html5Mode(true);
        }]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['admin']);
    });
})();
