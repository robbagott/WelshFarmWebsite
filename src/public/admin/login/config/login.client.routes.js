(function () {
	'use strict';

	angular
		.module('login')
		.config(configureAdminLoginRoute);

	configureAdminLoginRoute.$inject = ['$routeProvider'];

	function configureAdminLoginRoute($routeProvider) {
		console.log('Configured login routes');
		$routeProvider
			.when('/admin/login', {
				templateUrl: '/admin/login/views/login.client.view.html'
			})
			.otherwise({
				redirectTo: '/admin/login'
			});
	}
})();