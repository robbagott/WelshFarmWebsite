(function () {
	'use strict';

	angular
		.module('main', ['ngRoute', 'ngResource', 'shared_services', 'home', 'horses'])
		.config(['$locationProvider', function($locationProvider) {
			$locationProvider.html5Mode(true);
		}]);

	angular.element(document).ready(function() {
		angular.bootstrap(document, ['main']);
	});
})();