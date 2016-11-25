module devices {

  class AppComponent implements ng.IComponentOptions {

    public templateUrl: string;
    public $routeConfig: any;

    constructor() {
      this.templateUrl = 'app/components/device-app.component.html';
      this.$routeConfig = [
        {path: '/list', component: 'deviceList', name: 'List'},
        {path: '/details/:id', component: 'deviceDetails', name: 'Details'},
        {path: '/**', redirectTo: ['List', '']}
      ];
    }

  }

  angular
    .module('devices')
    .component('deviceApp', new AppComponent());

}
