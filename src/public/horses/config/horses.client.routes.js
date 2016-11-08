angular.module('home').config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/horses', {
			templateUrl: 'horses/views/horses.client.view.html'
		});
	}
]);	
