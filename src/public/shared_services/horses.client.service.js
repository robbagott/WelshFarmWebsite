'use strict';

angular.module('shared_services').factory('HorseApi', ['$resource', function ($resource) {
	return $resource('api/horses/:horseName', 
		{
			horseName: '@param_showName'
		}, 
		{
			update: {
				method: 'PUT'
			}
		});
}]);