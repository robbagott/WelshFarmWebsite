angular.module('home').config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
			templateUrl: 'home/views/home.client.view.html'
		})
		.otherwise({
			redirectTo: '/home'
		});
	}
]);	
