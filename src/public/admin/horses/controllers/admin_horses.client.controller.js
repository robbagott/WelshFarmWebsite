'use strict';

angular.module('admin_horses').controller('AdminHorseController', ['$routeParams', '$location', 'HorseApi', function ($routeParams, $location, HorseApi) {
	var self = this;

	self.create = function () {
		console.log("in create");
		console.log("fixed: " + self.fixed);
		var horseApi = new HorseApi({
			showName: self.showName,
			birthDate: self.birthDate,
			sex: self.sex,
			description: self.description,
			fixed: self.fixed
		});

		console.log(self.showName);
		console.log(self.birthDate);
		console.log(self.sex);
		console.log(self.description);

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