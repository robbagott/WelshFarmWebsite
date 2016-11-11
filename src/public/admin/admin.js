"use strict";

var adminModule = angular.module("admin", ['ngRoute', "login", "admin_horses"]);

adminModule
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, ["admin"]);
});