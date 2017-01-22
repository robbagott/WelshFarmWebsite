(function () {
	"use strict";

	angular
		.module('home')
		.config(configureAboutRoute);

	configureAboutRoute.$inject = ['$routeProvider'];

	function configureAboutRoute($routeProvider) {
		console.log('Configured about route');
		$routeProvider.when('/about', {
				templateUrl: 'about/views/about.client.view.html'
		});
	}	
})();
