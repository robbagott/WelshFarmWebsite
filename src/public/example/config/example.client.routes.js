angular.module('example').config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
			templateUrl: 'example/views/example.client.view.html'
		})
		.when('/users', {
			templateUrl: 'example/views/users.client.view.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	}
]);	
