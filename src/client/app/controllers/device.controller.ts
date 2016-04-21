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
        console.log(response);
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

  angular
    .module('devices')
    .controller('DeviceController', DeviceController);
}
