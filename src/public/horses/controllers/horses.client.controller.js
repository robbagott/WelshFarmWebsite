'use strict';

angular.module('horses').controller('HorsesController', ['$routeParams', 'HorseApi', function ($routeParams, HorseApi) {
	var self = this;

	self.find = function () {
		self.list = HorseApi.query(function () {
			console.log(self.list);
		});
	};
}]);
