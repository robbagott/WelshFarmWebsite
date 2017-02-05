(function () {
    'use strict';

    angular
        .module('blog')
        .controller('BlogController', BlogController);

    BlogController.$inject = [];

    function BlogController() {
        console.log('Initializing Blog Controller.');
    }
})();
