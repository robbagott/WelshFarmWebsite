"use strict";

angular.module('home').config(['$routeProvider', function($routeProvider) {
	console.log("configuring about route");
	$routeProvider.when('/about', {
			templateUrl: 'about/views/about.client.view.html'
		});
	}
]);	
