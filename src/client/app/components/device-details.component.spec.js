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
    bard.inject('$controller', '$q', '$rootScope', 'toastr', 'DeviceService');
  });

  describe('find', function () {

    var id = '570657ddea394e037033b588';

    describe('success', function() {

      beforeEach(function () {

        spyOn(DeviceService, 'find').and.returnValue($q.resolve(api.devices.find.success));

        controller = $controller('DeviceDetailsController', {
          DeviceService: DeviceService
        });

      });

      it('should exist', function () {
        expect(controller).toBeDefined();
      });

      it('should return device', function () {

        controller.find(id);

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

        controller = $controller('DeviceDetailsController', {
          DeviceService: DeviceService
        });

      });

      it('should exist', function () {
        expect(controller).toBeDefined();
      });

      it('should fail returning device', function () {

        spyOn(toastr, 'error');

        controller.find(id);

        $rootScope.$digest();

        expect(toastr.error).toHaveBeenCalledWith(error);
      });


    });


  });

  describe('$routerOnActivate', function () {

    beforeEach(function () {

      controller = $controller('DeviceDetailsController', {
        DeviceService: DeviceService
      });

      spyOn(controller, 'find');

    });

    it('should call find', function() {

      var next = {
        params: {
          id: 1
        }
      };

      controller.$routerOnActivate(next, null);

      expect(controller.find).toHaveBeenCalledWith(next.params.id);

    });

  });

});
