var router = require('express').Router();
var four0four = require('../utils/404')();

var routes = function(Device) {

    var deviceController = require('../controllers/deviceController')(Device);

    router
      .route('/')
      .get(deviceController.list)
      .post(deviceController.post);

    router.use('/:id', deviceController.use);
    router
      .route('/:id')
      .get(deviceController.get)
      .delete(deviceController.remove)
      .patch(deviceController.patch)
      .put(deviceController.put);

    router
      .route('/*')
      .get(four0four.notFoundMiddleware);

    return router;
};

module.exports = routes;
