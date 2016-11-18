'use strict';

angular.module('admin_horses').controller('AdminHorseController', ['$routeParams', 'HorseApi', function ($routeParams, HorseApi) {
	var self = this;

	self.create = function () {
		var horseApi = new HorseApi({
			showName: self.showName,
			birthDate: self.birthDate,
			sex: self.sex,
			description: self.description,
			gelded: self.gelded
		});

		horseApi.$save(function (response) {
				window.alert('Your horse was saved successfully');
			}, function (error) {
				console.log(error);
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