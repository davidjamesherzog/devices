var devices;
(function (devices) {
    'use strict';
    var DeviceController = (function () {
        function DeviceController(toastr, DeviceService) {
            this.toastr = toastr;
            this.DeviceService = DeviceService;
            this.devices = [];
            this.list();
        }
        DeviceController.prototype.list = function () {
            var _this = this;
            var success = function (response) {
                _this.devices = response;
            };
            var error = function (response) {
                toastr.error(response);
            };
            this.DeviceService.list()
                .then(success)
                .catch(error);
        };
        DeviceController.prototype.create = function (device) {
            var _this = this;
            var success = function (response) {
                console.log(response);
                toastr.success('Created Device - ' + device.ip + ' ' + device.description, 'Success');
                _this.list();
            };
            var error = function (response) {
                toastr.error(response);
            };
            this.DeviceService.create(device)
                .then(success)
                .catch(error);
        };
        DeviceController.prototype.purge = function (device) {
            var _this = this;
            var success = function (response) {
                toastr.success('Device Deleted - ' + device.ip + ' ' + device.description, 'Success');
                _this.list();
            };
            var error = function (response) {
                toastr.error(response);
            };
            this.DeviceService.purge(device._id)
                .then(success)
                .catch(error);
        };
        DeviceController.$inject = ['toastr', 'DeviceService'];
        return DeviceController;
    }());
    devices.DeviceController = DeviceController;
    angular
        .module('devices')
        .controller('DeviceController', DeviceController);
})(/* istanbul ignore next */devices || (devices = {}));

//# sourceMappingURL=device.controller.js.map
