(function () {
    'use strict';

    angular
        .module('horses')
        .controller('HorsesController', HorsesController);

    HorsesController.$inject = ['$routeParams', '$q', '$scope', 'HorseApi'];

    function HorsesController($routeParams, $q, $scope, HorseApi) {
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
            find().then(function (list) {
                console.log(list);
                self.refreshList();
            }, function (err) {
                console.log(err);
            });
        }

        // find() returns a promise
        function find() {
            return $q(function (resolve, reject) {
                self.list = HorseApi.query(function () {
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

                        var birthDate = new Date(horse.birthDate);
                        var now = new Date();
                        horse.ageInMonths = now.getMonth() - birthDate.getMonth() + 12 * (now.getFullYear() - birthDate.getFullYear());
                        console.log(horse.ageInMonths);
                        if (horse.ageInMonths < 12) {
                            horse.categories.push('young_stock');
                        }
                    });

                    resolve(self.list);
                }, function (error) {
                    return reject('Query for horses was unsuccessful');
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
