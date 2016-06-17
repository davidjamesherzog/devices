/* jshint -W117, -W030 */
describe('Device Detail Controller', function () {
  var controller;

  var api = {
    devices: {
      list: {
        success: readJSON('json/api/devices/list.json')
      },
      find: {
        success: readJSON('json/api/devices/find.json')
      }
    },
    error: {
      unknown: readJSON('json/api/unknownError.json')
    }
  };

  beforeEach(function () {
    bard.appModule('devices');
    bard.inject('$controller', '$q', '$rootScope', '$stateParams', 'toastr', 'DeviceService');
  });

  describe('find', function () {

    var id = '570657ddea394e037033b588';

    describe('success', function() {

      beforeEach(function () {

        spyOn(DeviceService, 'find').and.returnValue($q.resolve(api.devices.find.success));
        $stateParams.id = id;

        controller = $controller('DeviceDetailController', {
          $stateParams: $stateParams,
          DeviceService: DeviceService
        });

      });

      it('controller should exist', function () {
        expect(controller).toBeDefined;
      });

      it('should return device', function () {

        controller.find($stateParams.id);

        $rootScope.$apply();

        expect(controller.device).toBeDefined();
        expect(controller.device._id).toEqual(id);
        expect(controller.device.ip).toEqual(api.devices.find.success.ip);
        expect(controller.device.name).toEqual(api.devices.find.success.name);
        expect(controller.device.description).toEqual(api.devices.find.success.description);
        expect(controller.device.mac).toEqual(api.devices.find.success.mac);
        expect(controller.device.dhcp).toEqual(api.devices.find.success.dhcp);
        expect(controller.device.os).toEqual(api.devices.find.success.os);
        expect(controller.device.type).toEqual(api.devices.find.success.type);
      });

    });

    describe('failure', function() {

      var error = {
        error: 'Find Failed!'
      };

      beforeEach(function () {

        spyOn(DeviceService, 'find').and.returnValue($q.reject(error));
        $stateParams.id = id;

        controller = $controller('DeviceDetailController', {
          $stateParams: $stateParams,
          DeviceService: DeviceService
        });

      });

      it('controller should exist', function () {
        expect(controller).toBeDefined;
      });

      it('should fail returning device', function () {

        spyOn(toastr, 'error');

        controller.find($stateParams.id);

        $rootScope.$digest();

        expect(toastr.error).toHaveBeenCalledWith(error);
      });


    });


  });

});
