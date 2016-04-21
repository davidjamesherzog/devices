namespace devices {
  'use strict';

  interface IDeviceDetailsController {
    device: devices.IDevice;
    find: (id: string) => void
  }

  export class DeviceDetailController implements IDeviceDetailsController {

    static $inject: Array<string> = ['$stateParams', 'toastr', 'DeviceService'];
    constructor(private $stateParams: ng.ui.IStateParamsService,
                private toastr: Toastr,
                private DeviceService: devices.IDeviceService) {
      this.find($stateParams['id']);
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

  }

  angular
    .module('devices')
    .controller('DeviceDetailController', DeviceDetailController);

}


