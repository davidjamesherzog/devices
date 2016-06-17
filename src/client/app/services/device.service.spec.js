/* jshint -W117, -W030 */
describe('Device Service', function() {

  var responseObject;
  var functionObject;
  var id = '570657ddea394e037033b588';

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
      },
      purge: {
        success: readJSON('json/api/devices/create.json')
      }
    },
    error: {
      unknown: readJSON('json/api/unknownError.json')
    }
  };

  beforeEach(function () {
    bard.appModule('devices');
    bard.inject('$httpBackend', 'DeviceService');

    responseObject = {};
    functionObject = {
      success: function(response) {
        responseObject = response;
      },
      failure: function(response) {
        responseObject = response;
      }
    };
    spyOn(functionObject, 'success').and.callThrough();
    spyOn(functionObject, 'failure').and.callThrough();
  });

  it('exists', function () {
    expect(DeviceService).toBeDefined();
  });

  describe('list', function() {

    it('returns a value', function () {
      $httpBackend.whenGET('/api/devices').respond(200, api.devices.list.success);

      DeviceService.list()
        .then(functionObject.success, functionObject.failure);

      $httpBackend.flush();

      expect(functionObject.success).toHaveBeenCalled();
      expect(functionObject.failure).not.toHaveBeenCalled();

      expect(responseObject.length).toEqual(5);
      expect(responseObject[0]._id).toEqual(id);
      expect(responseObject[0].ip).toEqual('10.15.1.100');
      expect(responseObject[0].name).toEqual('Pluto');
      expect(responseObject[0].description).toEqual('Linux VM');
      expect(responseObject[0].mac).toEqual('EA:EA:EA:EA:EA');
      expect(responseObject[0].dhcp).toEqual(false);
      expect(responseObject[0].os).toEqual('Linux');
      expect(responseObject[0].type).toEqual('server');
    });

  });

  describe('find', function() {

    it('returns a value', function () {
      $httpBackend.whenGET('/api/devices/570657ddea394e037033b588').respond(200, api.devices.find.success);

      DeviceService.find(id)
        .then(functionObject.success, functionObject.failure);

      $httpBackend.flush();

      expect(functionObject.success).toHaveBeenCalled();
      expect(functionObject.failure).not.toHaveBeenCalled();

      expect(responseObject._id).toEqual(id);
      expect(responseObject.ip).toEqual('10.15.1.100');
      expect(responseObject.name).toEqual('Pluto');
      expect(responseObject.description).toEqual('Linux VM');
      expect(responseObject.mac).toEqual('EA:EA:EA:EA:EA');
      expect(responseObject.dhcp).toEqual(false);
      expect(responseObject.os).toEqual('Linux');
      expect(responseObject.type).toEqual('server');
    });

  });

  describe('create', function() {

    it('adds a device', function () {
      $httpBackend.whenPOST('/api/devices').respond(200, api.devices.create.success);

      var device = angular.copy(api.devices.create.success);
      delete device._id;
      DeviceService.create(device)
        .then(functionObject.success, functionObject.failure);

      $httpBackend.flush();

      expect(functionObject.success).toHaveBeenCalled();
      expect(functionObject.failure).not.toHaveBeenCalled();

      expect(responseObject._id).toEqual(id);
      expect(responseObject.ip).toEqual('10.15.1.100');
      expect(responseObject.name).toEqual('Pluto');
      expect(responseObject.description).toEqual('Linux VM');
      expect(responseObject.mac).toEqual('EA:EA:EA:EA:EA');
      expect(responseObject.dhcp).toEqual(false);
      expect(responseObject.os).toEqual('Linux');
      expect(responseObject.type).toEqual('server');
    });

  });

  describe('purge', function() {

    it('a device', function () {
      $httpBackend.whenDELETE('/api/devices/5725e14f07edb1cb1b45f272').respond(204);

      DeviceService.purge('5725e14f07edb1cb1b45f272')
        .then(functionObject.success, functionObject.failure);

      $httpBackend.flush();

      expect(functionObject.success).toHaveBeenCalled();
      expect(functionObject.failure).not.toHaveBeenCalled();

      expect(responseObject).toBeDefined();

    });

  });

});
