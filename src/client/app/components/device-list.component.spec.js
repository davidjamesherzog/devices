/* jshint -W117, -W030 */
describe('Device List Component', function () {
  var controller;
  var devices;

  var api = {
    devices: {
      list: {
        success: readJSON('json/api/devices/list.json')
      },
      find: {
        success: readJSON('json/api/devices/find.json')
      },
      create: {
        success: readJSON('json/api/devices/create.json')
      }
    },
    error: {
      unknown: readJSON('json/api/unknownError.json')
    }
  };

  beforeEach(function () {
    bard.appModule('devices');
    bard.inject('$controller', '$q', '$rootScope', 'toastr', 'DeviceService');

    devices = api.devices.list.success;
  });

  describe('list', function () {

    beforeEach(function () {
      devices = api.devices.list.success;
    });

    describe('success', function () {

      beforeEach(function () {
        spyOn(DeviceService, 'list').and.returnValue($q.resolve(devices));

        controller = $controller('DeviceListController');
      });

      it('should exist', function () {
        expect(controller).toBeDefined();
      });

      it('should have empty contacts array before activation', function () {
        expect(controller.devices).toBeDefined();
      });

      it('should have devices', function () {
        $rootScope.$digest();
        expect(controller.devices.length).toBeGreaterThan(0);
      });

      it('should have mock devices', function () {
        $rootScope.$digest();
        expect(controller.devices.length).toEqual(devices.length);
      });
    });

    describe('failure', function () {

      var error = {
        error: 'List Failed!'
      };

      beforeEach(function () {
        spyOn(DeviceService, 'list').and.returnValue($q.reject(error));

        controller = $controller('DeviceListController');
      });

      it('should not retrieve', function () {

        spyOn(toastr, 'error');

        $rootScope.$digest();

        expect(toastr.error).toHaveBeenCalledWith(error);
      });
    });

  });

  describe('create', function () {

    beforeEach(function () {
      spyOn(DeviceService, 'list').and.returnValue($q.resolve(devices));

      controller = $controller('DeviceListController');
    });

    it('should create new device', function () {

      var device = api.devices.list.success[0];
      spyOn(DeviceService, 'create').and.returnValue($q.when(devices[0]));

      controller.create(device);

      $rootScope.$digest();

      expect(controller.devices.length).toBeGreaterThan(0);
      expect(controller.devices.length).toEqual(devices.length);
    });

    it('should fail creating new device', function () {

      var device = api.devices.list.success[0];
      var error = {
        error: 'Create Failed!'
      };
      spyOn(DeviceService, 'create').and.returnValue($q.reject(error));
      spyOn(toastr, 'error');

      controller.create(device);

      $rootScope.$digest();

      expect(toastr.error).toHaveBeenCalledWith(error);
    });

  });

  describe('purge', function () {

    beforeEach(function () {
      spyOn(DeviceService, 'list').and.returnValue($q.resolve(devices));

      controller = $controller('DeviceListController');
    });

    it('should purge device', function () {

      var device = api.devices.list.success[0];
      spyOn(DeviceService, 'purge').and.returnValue($q.resolve({}));
      spyOn(toastr, 'success');
      spyOn(controller, 'list');

      controller.purge(device);

      $rootScope.$digest();

      expect(controller.devices.length).toBeGreaterThan(0);
      expect(controller.devices.length).toEqual(devices.length);

      expect(toastr.success).toHaveBeenCalled();
      expect(controller.list).toHaveBeenCalled();
    });

    it('should fail purging device', function () {

      var device = '570657ddea394e037033b588';
      var error = {
        error: 'Purge Failed!'
      };
      spyOn(DeviceService, 'purge').and.returnValue($q.reject(error));
      spyOn(toastr, 'error');

      controller.purge(device);

      $rootScope.$digest();

      expect(toastr.error).toHaveBeenCalledWith(error);
    });

  });

});
