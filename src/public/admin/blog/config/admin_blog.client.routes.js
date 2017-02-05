(function () {
   'use strict';

    angular
        .module('admin')
        .config(configureAdminBlogRoute);

    configureAdminBlogRoute.$inject = ['$routeProvider'];

    function configureAdminBlogRoute($routeProvider) {
        $routeProvider
            .when('/admin/posts', {
                templateUrl: '/admin/blog/views/posts.client.view.html'
            })
            .when('/admin/add_post', {
                templateUrl: '/admin/blog/views/add_post.client.view.html'
            })
            .when('/admin/edit_posts', {
                templateUrl: '/admin/blog/views/edit_posts.client.view.html'
            })
            .when('/admin/posts/:postTitle', {
                templateUrl: '/admin/blog/views/edit_post.client.view.html'
            });
    }
})();
