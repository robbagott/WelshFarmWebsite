(function () {
    'use strict';

    angular
        .module('admin_horses')
        .controller('AdminHorseController', adminHorseController);

    adminHorseController.$inject = ['$routeParams', 'HorseApi', '$scope'];

    function adminHorseController($routeParams, HorseApi, $scope) {
        var self = this;

        // Fields
        self.horse = {
            birthDate: '',
            color: '',
            dam: '',
            description: '',
            farmName: '',
            gelded: false,
            grey: false,
            height: undefined,
            imageFiles: [],
            sex: 'male',
            showName: '',
            sire: ''
        }
        self.imageMessage = "";
        self.list = [];

        // Methods
        self.addDataURLs = addDataURLs;
        self.create = create;
        self.delete = deleteHorse;
        self.find = find;
        self.findOne = findOne;
        self.getFileNames = getFileNames;
        self.update = update;

        function create() {

            // Get the image file names if any
            var inputElem = document.getElementById("imageInput");
            var fileNames = self.getFileNames(inputElem);

            if (!self.gelded) {
                self.gelded = false;
            }
            var horseApi = new HorseApi({
                birthDate: self.horse.birthDate,
                color: self.horse.color,
                dam: self.horse.dam,
                description: self.horse.description,
                farmName: self.horse.farmName,
                gelded: self.horse.gelded,
                grey: self.horse.grey,
                height: self.horse.height,
                imageFiles: self.horse.imageFiles,
                images: fileNames,
                sex: self.horse.sex,
                showName: self.horse.showName,
                sire: self.horse.sire
            });

            horseApi.$save(function (response) {
                    window.alert('Your horse was saved successfully');
                }, function (error) {
                    console.log(error);
                    self.error = error.data.message;
                });
        }

        function find() {
            self.list = HorseApi.query();
        }

        function findOne() {
            console.log('finding one');
            self.horse = HorseApi.get({
                horseName: $routeParams.horseName
            });
        }

        function update() {
            self.horse.param_showName = self.horse.showName;
            console.log(self.horse.farmName);
            self.horse.$update(function () {
                window.alert('Your horse was updated successfully');
            }, function (err) {
                self.error = err.data.message;
            });
        }

        function deleteHorse(horse) {
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
        }

        function getFileNames(elem) {
            console.log(elem);
            var files = elem.files;
            var fileNames = [];

            for (var i = 0; i < elem.files.length; i++) {
                fileNames.push(files[i].name);
            }
            return fileNames;
        }

        function addDataURLs() {
            var inputElem = document.getElementById("imageInput");
            var imageFiles = inputElem.files;

            for (var i = 0; i < imageFiles.length; i++) {

                //Check if the image was already added
                var alreadyAdded = false;
                for (var j = 0; j < self.horse.imageFiles.length; j++) {
                    if (imageFiles[i].name === self.horse.imageFiles[j].fileName) {
                        self.imageError = imageFiles[i].name + " already added\n";
                        alreadyAdded = true;
                    }
                }

                if (!alreadyAdded) {
                    (function(file) {
                        var reader = new FileReader();
                        reader.onload = function () {
                            self.horse.imageFiles.push({fileName: file.name, dataURL: reader.result});
                            self.imageMessage += file.name + " added\n";
                            self.imageError = "";
                            $scope.$apply();

                            console.log(self.horse.imageFiles);
                        }
                        reader.readAsDataURL(file);
                    })(imageFiles[i]);
                }
            }
        };
    }
})();
