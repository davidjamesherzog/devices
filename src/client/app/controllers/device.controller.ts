namespace devices {
  'use strict';

  interface IDeviceController {
    devices: Array<any>;
    list: () => void,
    create: (device: devices.IDevice) => void,
    purge: (device: devices.IDevice) => void
  }

  export class DeviceController implements IDeviceController {

    static $inject: Array<string> = ['toastr', 'DeviceService'];
    constructor(private toastr: Toastr,
                private DeviceService: devices.IDeviceService) {
      this.list();
    }

    devices: Array<devices.IDevice> = [];

    list() {
      let self = this;

      let success = function(response) {
        self.devices = response;
      };

      let error = function(response) {
        toastr.error(response);
      };

      this.DeviceService.list()
        .then(success)
        .catch(error);

    }

    create(device: devices.IDevice) {
      let self = this;

      let success = function(response) {
        console.log(response);
        toastr.success('Created Device - ' + device.ip + ' ' + device.description, 'Success');
        self.list();
      };

      let error = function(response) {
        toastr.error(response);
      };

      this.DeviceService.create(device)
        .then(success)
        .catch(error);

    }

    purge(device: devices.IDevice) {
      let self = this;

      let success = function(response) {
        console.log(response);
        toastr.success('Device Deleted - ' + device.ip + ' ' + device.description, 'Success');
        self.list();
      };

      let error = function(response) {
        toastr.error(response);
      };

      this.DeviceService.purge(device)
        .then(success)
        .catch(error);
    }

  }

  angular
    .module('devices')
    .controller('DeviceController', DeviceController);
}
