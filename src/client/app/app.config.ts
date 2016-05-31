namespace devices {
  'use strict';

  angular
    .module('devices')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdIconProvider', '$mdThemingProvider'];
  function config($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider,
                  $mdIconProvider: angular.material.IIconProvider, $mdThemingProvider: angular.material.IThemingProvider) {
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

    $mdIconProvider
      .icon('menu', './svg/menu.svg', 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
  }

}
