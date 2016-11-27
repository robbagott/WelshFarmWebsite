'use strict';

angular.module('admin_horses').controller('AdminHorseController', ['$routeParams', 'HorseApi', '$scope', function ($routeParams, HorseApi, $scope) {
	var self = this;

	self.imageFiles = [];
	self.imageMessage = "";

	self.create = function () {

		// Get the image file names if any
		var inputElem = document.getElementById("imageInput");
		var fileNames = self.getFileNames(inputElem);

		if (!self.gelded) {
			self.gelded = false;
		}
		var horseApi = new HorseApi({
			showName: self.showName,
			birthDate: self.birthDate,
			sex: self.sex,
			description: self.description,
			gelded: self.gelded,
			images: fileNames,
			imageFiles: self.imageFiles
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

	self.getFileNames = function (elem) {
		console.log(elem);
		var files = elem.files;
		var fileNames = [];

		for (var i = 0; i < elem.files.length; i++) {
			fileNames.push(files[i].name);
		}
		return fileNames;
	};

	self.addDataURLs = function () {
		var inputElem = document.getElementById("imageInput");
		var imageFiles = inputElem.files;

		for (var i = 0; i < imageFiles.length; i++) {

			//Check if the image was already added
			var alreadyAdded = false;
			for (var j = 0; j < self.imageFiles.length; j++) {
				if (imageFiles[i].name === self.imageFiles[j].fileName) {
					self.imageError = imageFiles[i].name + " already added\n";
					alreadyAdded = true;
				}
			}

			if (!alreadyAdded) {
				(function(file) {
					var reader = new FileReader();
					reader.onload = function () {
						self.imageFiles.push({fileName: file.name, dataURL: reader.result});
						self.imageMessage += file.name + " added\n";
						self.imageError = "";
						$scope.$apply();

						console.log(self.imageFiles);
					}
					reader.readAsDataURL(file);
				})(imageFiles[i]);
			}
		}
	};
}]);