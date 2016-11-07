var mainApplicationModuleName = 'Main';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'home']);

mainApplicationModule
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}])
	.run(['$location', function($location) {
		var path = $location.url();
		$location.url('/');
		$location.path(path);
	}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});