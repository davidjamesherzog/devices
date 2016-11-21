var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var deviceModel = new Schema({
  name: {type: String},
  description: {type: String},
  dhcp: {type: Boolean},
  ip: {type: String},
  mac: {type: String},
  type: {type: String},
  os: {type: String}
});

module.exports = mongoose.model('Device', deviceModel);
