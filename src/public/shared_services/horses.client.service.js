(function () {
    'use strict';

    angular
        .module('shared_services')
        .factory('HorseApi', HorseApiService);

    HorseApiService.$inject = ['$resource'];

    function HorseApiService($resource) {
        return $resource('api/horses/:horseName',
            {
                horseName: '@param_showName'
            },
            {
                update: {
                    method: 'PUT'
                }
            });
    }
})();
