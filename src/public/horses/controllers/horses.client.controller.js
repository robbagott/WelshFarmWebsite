(function () {
	'use strict';

	angular
		.module('horses')
			.controller('HorsesController', HorsesController);

	HorsesController.$inject = ['$routeParams', '$q', 'HorseApi'];

	function HorsesController($routeParams, $q, HorseApi) {
		var self = this;

		// Fields
		self.list = [];
		self.activeList = [];
		self.filter = "all";

		// Methods
		self.find = find;
		self.init = init;
		self.refreshList = refreshList;

		function init() {
			find().then(function () {
				self.refreshList();
			});
		}

		// find() returns a promise
		function find() {
			return $q(function (resolve, reject) {
				self.list = HorseApi.query(function () {
					console.log(self.list);
					// Sort horses into categories when they come in.
					// Also tack on age.
					angular.forEach(self.list, function(horse, i) {
						horse.categories = [];
						horse.categories.push('all');

						if (horse.sex === 'male') {
							if (horse.gelded === true) {
								horse.categories.push('stallions');
							} else {
								horse.categories.push('geldings');
							}
						} else {
							horse.categories.push('mares');
						}
					});
					resolve(self.list);
				}, function (error) {
						reject('Query for horses was unsuccessful');
				});
			});
		}

		function refreshList() {
			self.activeList = [];
			angular.forEach(self.list, function(horse, i) {
				if (horse.categories.includes(self.filter)) {
					self.activeList.push(horse);
				}
			});
		}

		
	}
})();