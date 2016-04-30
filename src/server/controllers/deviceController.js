var deviceController = function(Device) {

  var api = {
    list: list,
    get: get,
    patch: patch,
    post: post,
    put: put,
    remove: remove,
    use: use
  };
  return api;

  function list(req, res) {

    var query = {};
    /*if (req.query.genre) {
      query.genre = req.query.genre;
    }*/

    Device.find(query, '-__v', function(err, devices) {
      if (err)
        res.status(500).send(err);
      else
        res.json(devices);
    });
  }

  function get(req, res) {
    res.json(req.device);
  }

  function patch(req, res) {
    if (req.body._id)
      delete req.body._id;

    for (var p in req.body) {
      req.device[p] = req.body[p];
    }

    req.device.save(function(err) {
      if (err)
        res.status(500).send(err);
      else{
        res.json(req.device);
      }
    });

  }

  function post(req, res) {
    req.device = {};
    _mapRequest(req);

    var device = new Device(req.device);

    //if (!req.body.title) {
    //  res.status(400);
    //  res.send('Title is required');
    //} else {
    device.save();
    res.status(201);
    res.send(device);
    //}

  }

  function put(req, res) {
    _mapRequest(req);

    req.device.save(function(err) {
      if(err)
        res.status(500).send(err);
      else{
        res.json(req.device);
      }
    });
  }

  function remove(req, res) {
    req.device.remove(function(err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('Removed');
      }
    })
  }

  function use(req, res, next) {
    Device.findById(req.params.id, '-__v', function(err, device) {
      if (err) {
        res.status(500).send(err);
      } else if (device) {
        req.device = device;
        next();
      } else {
        res.status(404).send('no device found');
      }
    });
  }

  function _mapRequest(req) {
    req.device.name = req.body.name;
    req.device.description = req.body.description;
    req.device.ip = req.body.ip;
    req.device.dhcp = req.body.dhcp;
    req.device.mac = req.body.mac;
    req.device.type = req.body.type;
    req.device.os = req.body.os;
  }

};

module.exports = deviceController;
