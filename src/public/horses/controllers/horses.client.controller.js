(function () {
	'use strict';

	angular
		.module('horses')
			.controller('HorsesController', HorsesController);

	HorsesController.$inject = ['$routeParams', 'HorseApi'];

	function HorsesController($routeParams, HorseApi) {
		var self = this;

		self.find = find;

		function find() {
			self.list = HorseApi.query(function () {
			});
		}
	}
})();