/* jshint -W117, -W030 */
/*
xdescribe('Contacts Detail Controller', function () {
  var controller;
  var spy;
  var responseObject;
  var functionObject;
  var spySuccess;
  var spyFailure;

  var api = {
    contacts: {
      find: {
        success: readJSON('json/api/contacts/find.json')
      }
    },
    error: {
      unknown: readJSON('json/api/unknownError.json')
    }
  };

  beforeEach(function () {
    bard.appModule('devices');
    bard.inject('$controller', '$q', '$rootScope', '$stateParams', 'ContactsService');

    controller = $controller('ContactsDetailController');
    /!*controller = $controller('ContactsDetailController', {
      $stateParams: $stateParams,
      ContactsService: ContactsService
    });*!/

    responseObject = {};
    functionObject = {
      success: function(response) {
        responseObject = response;
      },
      failure: function(response) {
        responseObject = response;
      }
    };
    spySuccess = sinon.spy(functionObject, 'success');
    spyFailure = sinon.spy(functionObject, 'failure');
  });

  it('should exist', function () {
    expect(controller).to.exist;
  });

  describe('find', function () {

    var id = '56d765240b76fee631c409ef';

    beforeEach(function () {
      $stateParams.id = id;

      spy = sinon.stub(ContactsService, 'find');
      spy.withArgs(id).returns($q.resolve(api.contacts.find.success));
    });

    it('should return contact', function () {

      console.log(controller);
      controller.find()
        .then(functionObject.success, functionObject.failure);

      $rootScope.$apply();

      expect(spySuccess).to.have.been.called;
      expect(spyFailure).not.to.have.been.called;

      /!*expect(controller.contact).to.exist;
      expect(controller.contact.id).to.be.equal(id);
      expect(controller.contact.firstName).to.be.equal('Jim');
      expect(controller.contact.lastName).to.be.equal('Smith');
      expect(controller.contact.phone).to.be.equal('555-555-5555');*!/
    });

  });

});
*/
