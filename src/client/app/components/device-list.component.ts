module devices {
  'use strict';

  export class DeviceListController implements IDeviceListController {

    static $inject: Array<string> = ['toastr', 'DeviceService'];
    constructor(private toastr: Toastr,
                private DeviceService: devices.IDeviceService) {
      this.list();
    }

    devices: Array<devices.IDevice> = [];

    list() {

      let success = (response) => {
        this.devices = response;
      };

      let error = (response) => {
        toastr.error(response);
      };

      this.DeviceService.list()
        .then(success)
        .catch(error);

    }

    create(device: devices.IDevice) {

      let success = (response) => {
        console.log(response);
        toastr.success('Created Device - ' + device.ip + ' ' + device.description, 'Success');
        this.list();
      };

      let error = (response) => {
        toastr.error(response);
      };

      this.DeviceService.create(device)
        .then(success)
        .catch(error);

    }

    purge(device: devices.IDevice) {

      let success = (response) => {
        toastr.success('Device Deleted - ' + device.ip + ' ' + device.description, 'Success');
        this.list();
      };

      let error = (response) => {
        toastr.error(response);
      };

      this.DeviceService.purge(device._id)
        .then(success)
        .catch(error);
    }

  }

  class DeviceListComponent implements ng.IComponentOptions {

    public bindings: any;
    public controller: any;
    public controllerAs: string;
    public templateUrl: string;

    constructor() {
      this.bindings = {
        '$router': '<'
      };
      this.templateUrl = 'app/components/device-list.component.html';
      this.controller = DeviceListController;
      this.controllerAs = 'vm'
    }

  }

  angular
    .module("devices")
    .component("deviceList", new DeviceListComponent())
    .controller('DeviceListController', DeviceListController);
}
