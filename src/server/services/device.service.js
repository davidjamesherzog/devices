var devices;
(function (devices_1) {
    'use strict';
    var DeviceService = (function () {
        function DeviceService($resource, $q) {
            this.$resource = $resource;
            this.$q = $q;
        }
        DeviceService.prototype.list = function () {
            var deferred = this.$q.defer();
            var devices = [];
            var success = function (response) {
                response.forEach(function (element) {
                    var device = {
                        _id: element._id,
                        ip: element.ip,
                        name: element.name,
                        description: element.description,
                        mac: element.mac,
                        dhcp: element.dhcp,
                        os: element.os,
                        type: element.type
                    };
                    devices.push(device);
                });
                deferred.resolve(devices);
            };
            var resource = this.$resource('/api/devices/');
            resource.query(success);
            return deferred.promise;
        };
        DeviceService.prototype.find = function (id) {
            var deferred = this.$q.defer();
            var device = null;
            var success = function (response) {
                device = {
                    _id: response._id,
                    ip: response.ip,
                    name: response.name,
                    description: response.description,
                    mac: response.mac,
                    dhcp: response.dhcp,
                    os: response.os,
                    type: response.type
                };
                console.log(device);
                deferred.resolve(device);
            };
            var resource = this.$resource('/api/devices/:id/', { id: id });
            resource.get(success);
            return deferred.promise;
        };
        DeviceService.prototype.create = function (device) {
            var deferred = this.$q.defer();
            var success = function (response) {
                deferred.resolve(response);
            };
            var resource = this.$resource('/api/devices/');
            resource.save(device, success);
            return deferred.promise;
        };
        DeviceService.prototype.purge = function (id) {
            var deferred = this.$q.defer();
            var success = function (response) {
                deferred.resolve(response);
            };
            var resource = this.$resource('/api/devices/:id/', { id: id });
            resource.delete(id, success);
            return deferred.promise;
        };
        DeviceService.$inject = ['$resource', '$q'];
        return DeviceService;
    }());
    devices_1.DeviceService = DeviceService;
    angular
        .module('devices')
        .service('DeviceService', DeviceService);
})(/* istanbul ignore next */devices || (devices = {}));

//# sourceMappingURL=device.service.js.map
