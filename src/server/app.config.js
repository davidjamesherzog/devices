var devices;
(function (devices) {
    'use strict';
    angular
        .module('devices')
        .config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('devices', {
            url: '/',
            templateUrl: 'app/layout/devices.html',
            controller: 'DeviceController',
            controllerAs: 'vm'
        })
            .state('details', {
            url: '/details/:id',
            templateUrl: 'app/layout/device.details.html',
            controller: 'DeviceDetailController',
            controllerAs: 'vm'
        });
    }
})(/* istanbul ignore next */devices || (devices = {}));

//# sourceMappingURL=app.config.js.map