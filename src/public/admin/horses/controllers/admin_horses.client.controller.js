'use strict';

angular.module('admin_horses').controller('AdminHorseController', ['$routeParams', '$location', 'HorseApi', function ($routeParams, $location, HorseApi) {
	var self = this;

	self.create = function () {
		var horseApi = new HorseApi({
			name: self.horseName,
			showName: self.horseShowName,
			description: self.horseDescription
		});

		horseApi.$save(function (response) {
				window.alert('Your horse was saved successfully');
			}, function (error) {
				self.error = error.data.message;
			});
	};

	self.find = function () {
		self.list = HorseApi.query();
	};

	self.findOne = function () {
		self.horse = HorseApi.get({
			name: $routeParams.horseName
		});
	};
}]);