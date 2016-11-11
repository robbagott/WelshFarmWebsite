angular.module('admin_horses').factory('HorseApi', ['$resource', function ($resource) {
	return $resource('api/horses/:horseName', 
		{
			horseName: '@name'
		}, 
		{
			update: {
				method: 'PUT'
			}
		});
}]);