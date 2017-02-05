(function() {
    'use strict';

    angular
        .module('home')
        .config(configureBlogRoute);

    configureBlogRoute.$inject = ['$routeProvider'];

    function configureBlogRoute($routeProvider) {
        console.log('Configured blog route');

        $routeProvider.when('/blog', {
            templateUrl: 'blog/views/blog.client.view.html'
        });
    }
})();
