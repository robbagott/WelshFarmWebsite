'use strict';

angular.module('admin_horses').controller('AdminHorseController', ['$routeParams', 'HorseApi', function ($routeParams, HorseApi) {
	var self = this;

	self.create = function () {
		if (!self.gelded) {
			self.gelded = false;
		}
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
			horseName: $routeParams.horseName
		});
	};

	self.update = function () {
		self.horse.param_showName = self.horse.showName;
		self.horse.$update(function () {
			window.alert('Your horse was updated successfully');
		}, function (err) {
			self.error = err.data.message;
		});
	};

	self.delete = function (horse) {
		if (horse) {
			horse.param_showName = horse.showName;
			horse.$remove(function (err) {
				for (var i in self.list) {
					if (self.list[i] === horse) {
						self.list.splice(i, 1);
					}
				}

			});
		}
	};
}]);