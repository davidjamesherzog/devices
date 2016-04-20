namespace devices {
  'use strict';

  export interface IDeviceService {
    list: () => ng.IPromise<Array<devices.IDevice>>;
    find: (id: string) => ng.IPromise<devices.IDevice>;
    create: (device: devices.IDevice) => ng.IPromise<devices.IDevice>;
    purge: (device: devices.IDevice) => ng.IPromise<void>;
  }

  export class DeviceService implements IDeviceService {

    static $inject: Array<string> = ['$resource', '$q'];
    constructor(private $resource: ng.resource.IResourceService,
                private $q: ng.IQService) {
    }

    list() {

      let deferred = this.$q.defer();

      let devices: Array<devices.IDevice> = [];

      let success = (response: Array<devices.IDevice>) => {

        response.forEach((element: devices.IDevice) => {
          let device: devices.IDevice = {
            _id: element._id,
            ip: element.ip,
            name: element.name,
            description: element.description,
            mac: element.mac
          };
          devices.push(device);
        });

        deferred.resolve(devices);
      };

      let resource = this.$resource('/api/devices/');
      resource.query(success);

      return deferred.promise;
    }

    find(id: string) {

      let deferred = this.$q.defer();

      let device: devices.IDevice = null;

      let success = (response: devices.IDevice) => {
        device = {
          _id: response._id,
          ip: response.ip,
          name: response.name,
          description: response.description,
          mac: response.mac
        };
        console.log(device);
        deferred.resolve(device);
      };

      let resource = this.$resource('/api/devices/:id/', {id: id});
      resource.get(success);

      return deferred.promise;

    }

    create(device: devices.IDevice) {

      let deferred = this.$q.defer();

      let success = (response: devices.IDevice) => {
         deferred.resolve(response);
      };

      let resource = this.$resource('/api/devices/');
      resource.save(device, success);

      return deferred.promise;

    }

    purge(device: devices.IDevice) {
      let deferred = this.$q.defer();

      let success = (response: devices.IDevice) => {
        deferred.resolve(response);
      };

      console.log('ID: ' + device._id);
      let resource = this.$resource('/api/devices/:id/', {id: device._id});
      resource.delete(device._id, success);

      return deferred.promise;
    }
  }

  angular
    .module('devices')
    .service('DeviceService', DeviceService);
}
