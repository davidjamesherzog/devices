var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var deviceModel = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  dhcp: {
    type: Boolean,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  mac: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: [
      true,
      'typeRequired'
    ],
    enum: ['server', 'desktop', 'phone', 'tablet', 'laptop']
  },
  os: {
    type: String,
    required: [
      true,
      'osRequired'
    ],
    enum: ['Windows', 'Linux', 'iOS', 'Android', 'Mac']
  }
});

module.exports = mongoose.model('Device', deviceModel);
