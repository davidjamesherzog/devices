namespace devices {
  'use strict';

  interface IDeviceDetailsController {
    device: devices.IDevice;
    find: (id: string) => void
  }

  export class DeviceDetailController implements IDeviceDetailsController {

    static $inject: Array<string> = ['$stateParams', 'DeviceService'];
    constructor(private $stateParams: ng.ui.IStateParamsService,
                private DeviceService: devices.IDeviceService) {
      this.find($stateParams['id']);
    }

    //var _this = this;
    device: devices.IDevice = null;

    find(id: string) {
      this.DeviceService.find(id)
        .then((response) => {
          this.device = response;
        });
    }

  }

  angular
    .module('devices')
    .controller('DeviceDetailController', DeviceDetailController);

}


