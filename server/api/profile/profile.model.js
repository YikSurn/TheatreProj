'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  email: String,
  phone: {
    type: String,
    default: 'None Provided'
  },
  addressHome: {
    type: String,
    default: 'None Provided'
  },
  addressTerm: {
    type: String,
    default: 'None Provided'
  },
  role: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Profile', ProfileSchema);