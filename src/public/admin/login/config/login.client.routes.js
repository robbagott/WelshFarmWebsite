angular.module('login').config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/admin/login', {
		templateUrl: '/admin/login/views/login.client.view.html'
	})
	.otherwise({
		redirectTo: '/admin/login'
	});
}]);