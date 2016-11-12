var devices;
(function (devices) {
    'use strict';
    var DeviceDetailController = (function () {
        function DeviceDetailController($stateParams, toastr, DeviceService) {
            this.$stateParams = $stateParams;
            this.toastr = toastr;
            this.DeviceService = DeviceService;
            this.device = null;
            this.find($stateParams['id']);
        }
        DeviceDetailController.prototype.find = function (id) {
            var _this = this;
            var success = function (response) {
                _this.device = response;
            };
            var error = function (response) {
                toastr.error(response);
            };
            this.DeviceService.find(id)
                .then(success)
                .catch(error);
        };
        DeviceDetailController.$inject = ['$stateParams', 'toastr', 'DeviceService'];
        return DeviceDetailController;
    }());
    devices.DeviceDetailController = DeviceDetailController;
    angular
        .module('devices')
        .controller('DeviceDetailController', DeviceDetailController);
})(/* istanbul ignore next */devices || (devices = {}));

//# sourceMappingURL=device.detail.controller.js.map
