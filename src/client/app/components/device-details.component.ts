module devices {
  'use strict';

  export class DeviceDetailsController implements IDeviceDetailsController {

    static $inject: Array<string> = ['toastr', 'DeviceService'];
    constructor(private toastr: Toastr,
                private DeviceService: devices.IDeviceService) {

    }

    device: devices.IDevice = null;

    find(id: string) {

      let success = (response) => {
        this.device = response;
      };

      let error = (response) => {
        toastr.error(response);
      };

      this.DeviceService.find(id)
        .then(success)
        .catch(error);
    }

    $routerOnActivate(next, previous) {
      this.find(next.params.id);
    };

  }

  class DeviceDetailsComponent implements ng.IComponentOptions {

    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public templateUrl: string;

    constructor() {
      this.bindings = {};
      this.templateUrl = 'app/components/device-details.component.html';
      this.controller = DeviceDetailsController;
      this.controllerAs = 'vm'
    }

  }

  angular
    .module("devices")
    .component("deviceDetails", new DeviceDetailsComponent())
    .controller('DeviceDetailsController', DeviceDetailsController);

}
