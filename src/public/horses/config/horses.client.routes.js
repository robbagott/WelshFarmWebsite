angular.module('home').config(['$routeProvider', function($routeProvider) {
	console.log("horses route configured");
	$routeProvider.when('/horses', {
			templateUrl: 'horses/views/horses.client.view.html'
		});
	}
]);	
