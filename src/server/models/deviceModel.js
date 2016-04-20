var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var deviceModel = new Schema({
  ip: {type: String},
  name: {type: String},
  description: {type: String},
  mac: {type: String}
});

module.exports = mongoose.model('Device', deviceModel);
